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

type GeoInfo = {
  label: string;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  lat?: string;
  lon?: string;
  isp?: string;
  org?: string;
  mapsUrl?: string;
  source: string;
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

function isPrivateIp(ip: string) {
  if (
    ip === "unknown" ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("fc") ||
    ip.startsWith("fd")
  ) {
    return true;
  }

  if (ip.startsWith("172.")) {
    const second = Number(ip.split(".")[1]);
    return second >= 16 && second <= 31;
  }

  return false;
}

function pruneOld(now: number) {
  for (const [ip, at] of recent) {
    if (now - at > COOLDOWN_MS) recent.delete(ip);
  }
}

function geoFromVercelHeaders(request: Request): GeoInfo | null {
  const city = request.headers.get("x-vercel-ip-city") || undefined;
  const region = request.headers.get("x-vercel-ip-country-region") || undefined;
  const country = request.headers.get("x-vercel-ip-country") || undefined;
  const lat = request.headers.get("x-vercel-ip-latitude") || undefined;
  const lon = request.headers.get("x-vercel-ip-longitude") || undefined;

  if (!city && !region && !country) return null;

  const parts = [city, region, country].filter(Boolean);
  const mapsUrl =
    lat && lon
      ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lon}`)}`
      : undefined;

  return {
    label: parts.join(", ") || "Unknown",
    city,
    region,
    country,
    lat: lat || undefined,
    lon: lon || undefined,
    mapsUrl,
    source: "Vercel edge IP",
  };
}

async function geoFromIpWhoIs(ip: string): Promise<GeoInfo | null> {
  const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    success?: boolean;
    city?: string;
    region?: string;
    country?: string;
    postal?: string;
    latitude?: number;
    longitude?: number;
    connection?: { isp?: string; org?: string };
  };

  if (!data.success) return null;

  const parts = [data.city, data.region, data.country].filter(Boolean);
  const lat = data.latitude != null ? String(data.latitude) : undefined;
  const lon = data.longitude != null ? String(data.longitude) : undefined;

  return {
    label: parts.join(", ") || "Unknown",
    city: data.city,
    region: data.region,
    country: data.country,
    postal: data.postal,
    lat,
    lon,
    isp: data.connection?.isp,
    org: data.connection?.org,
    mapsUrl:
      lat && lon
        ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lon}`)}`
        : undefined,
    source: "IP lookup (ipwho.is)",
  };
}

async function resolveGeo(request: Request, ip: string): Promise<GeoInfo> {
  const edge = geoFromVercelHeaders(request);

  if (isPrivateIp(ip)) {
    return (
      edge ?? {
        label: "Local / private network (no public IP)",
        source: "local",
      }
    );
  }

  try {
    const lookup = await geoFromIpWhoIs(ip);
    if (lookup && edge) {
      // Prefer richer ISP from lookup; keep edge coords if lookup missing
      return {
        ...edge,
        ...lookup,
        lat: lookup.lat || edge.lat,
        lon: lookup.lon || edge.lon,
        mapsUrl: lookup.mapsUrl || edge.mapsUrl,
        label: lookup.label !== "Unknown" ? lookup.label : edge.label,
        source: `${edge.source} + ${lookup.source}`,
      };
    }
    if (lookup) return lookup;
  } catch (error) {
    console.error("IP geolocation failed:", error);
  }

  return (
    edge ?? {
      label: "Could not resolve location from IP",
      source: "unavailable",
    }
  );
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

  const geo = await resolveGeo(request, ip);

  const locationDetail = [
    geo.label,
    geo.postal ? `PIN ${geo.postal}` : null,
    geo.lat && geo.lon ? `${geo.lat}, ${geo.lon}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

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
    ["Location", locationDetail],
    ["ISP / Network", geo.isp || geo.org || "unknown"],
    ["Maps", geo.mapsUrl || "—"],
    ["Geo source", geo.source],
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

  const subjectPlace = geo.city || geo.region || geo.country || platform || "device";

  try {
    await transporter.sendMail({
      from: `"Portfolio visitor" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      subject: `👀 Portfolio visit from ${subjectPlace}`,
      text: [
        "Someone just opened your portfolio.",
        "",
        "Location is estimated from IP (city-level). GPS requires visitor permission and is not used.",
        "",
        ...rows.map(([k, v]) => `${k}: ${v}`),
      ].join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111; max-width: 560px;">
          <h2 style="margin: 0 0 8px;">Someone is exploring your website</h2>
          <p style="margin: 0 0 16px; color: #555; font-size: 14px;">
            Estimated location from their IP (usually city-level — not street GPS).
            ${
              geo.mapsUrl
                ? `<br /><a href="${escapeHtml(geo.mapsUrl)}" style="color:#4f7cff;">Open approx. point on Google Maps</a>`
                : ""
            }
          </p>
          <table style="width:100%; border-collapse: collapse; font-size: 14px;">
            ${rows
              .map(
                ([k, v]) => `
              <tr>
                <td style="padding: 8px 12px; border-top: 1px solid #eee; color:#666; width: 120px; vertical-align: top;">${escapeHtml(k)}</td>
                <td style="padding: 8px 12px; border-top: 1px solid #eee; word-break: break-word;">${
                  k === "Maps" && geo.mapsUrl
                    ? `<a href="${escapeHtml(geo.mapsUrl)}">${escapeHtml(geo.mapsUrl)}</a>`
                    : escapeHtml(v)
                }</td>
              </tr>`,
              )
              .join("")}
          </table>
        </div>
      `,
    });

    recent.set(ip, now);
    return NextResponse.json({ ok: true, location: geo.label });
  } catch (error) {
    console.error("Failed to send visit notification:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
