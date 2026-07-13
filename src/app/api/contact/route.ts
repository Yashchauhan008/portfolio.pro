import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function escapeHtml(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Name, email, mobile number, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
    console.error("Missing SMTP environment variables");
    return NextResponse.json({ error: "Mail service is not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message);
  const telHref = phone.replace(/\s+/g, "");

  try {
    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio inquiry — ${name}`,
      text: `${message}\n\n— ${name}\nEmail: ${email}\nPhone: ${phone}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
          <p style="white-space: pre-wrap;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <p style="color: #666; font-size: 14px;">
            From: <strong>${safeName}</strong><br />
            Email: <a href="mailto:${safeEmail}">${safeEmail}</a><br />
            Phone: <a href="tel:${escapeHtml(telHref)}">${safePhone}</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
