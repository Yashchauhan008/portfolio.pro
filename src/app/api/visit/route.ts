import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type VisitBody = {
  path?: string;
  referrer?: string;
  language?: string;
  timezone?: string;
  screen?: string;
  viewport?: string;
  platform?: string;
  userAgent?: string;
};

/** In-memory throttle: one visit mail per IP per cooldown window. */
const recent = new Map<string, number>();
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

function escapeHtml(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function pruneOld(now: number) {
  for (const [ip, at] of recent) {
    if (now - at > COOLDOWN_MS) recent.delete(ip);
  }
}

export async function POST(request: Request) {
  // Skip in local/dev unless explicitly enabled
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.VISIT_NOTIFY !== "true"
  ) {
    return NextResponse.json({ ok: true, skipped: "dev" });
  }

  let body: VisitBody = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const ip = clientIp(request);
  const now = Date.now();
  pruneOld(now);

  const last = recent.get(ip);
  if (last && now - last < COOLDOWN_MS) {
    return NextResponse.json({ ok: true, skipped: "rate_limited" });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
    return NextResponse.json({ ok: true, skipped: "unconfigured" });
  }

  const path = (body.path || "/").slice(0, 200);
  const referrer = (body.referrer || "Direct / unknown").slice(0, 300);
  const language = (body.language || "unknown").slice(0, 80);
  const timezone = (body.timezone || "unknown").slice(0, 80);
  const screen = (body.screen || "unknown").slice(0, 40);
  const viewport = (body.viewport || "unknown").slice(0, 40);
  const platform = (body.platform || "unknown").slice(0, 80);
  const userAgent = (
    body.userAgent ||
    request.headers.get("user-agent") ||
    "unknown"
  ).slice(0, 400);

  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const rows: [string, string][] = [
    ["When", `${when} (IST)`],
    ["Page", path],
    ["Device / OS", platform],
    ["Screen", screen],
    ["Viewport", viewport],
    ["Language", language],
    ["Timezone", timezone],
    ["Came from", referrer],
    ["IP", ip],
    ["Browser", userAgent],
  ];

  try {
    await transporter.sendMail({
      from: `"Portfolio visitor" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      subject: `👀 Someone is exploring your portfolio — ${platform || "device"}`,
      text: [
        "Someone just opened your portfolio.",
        "",
        "Note: browsers cannot share a visitor's email/Google account without them signing in.",
        "",
        ...rows.map(([k, v]) => `${k}: ${v}`),
      ].join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111; max-width: 560px;">
          <h2 style="margin: 0 0 8px;">Someone is exploring your website</h2>
          <p style="margin: 0 0 16px; color: #555; font-size: 14px;">
            A visitor just opened your portfolio on this device.
            <br /><em style="color:#888;">Browsers don't expose email/Google accounts on visit — only device &amp; network clues below.</em>
          </p>
          <table style="width:100%; border-collapse: collapse; font-size: 14px;">
            ${rows
              .map(
                ([k, v]) => `
              <tr>
                <td style="padding: 8px 12px; border-top: 1px solid #eee; color:#666; width: 120px; vertical-align: top;">${escapeHtml(k)}</td>
                <td style="padding: 8px 12px; border-top: 1px solid #eee; word-break: break-word;">${escapeHtml(v)}</td>
              </tr>`,
              )
              .join("")}
          </table>
        </div>
      `,
    });

    recent.set(ip, now);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send visit notification:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
