import "server-only";

import nodemailer from "nodemailer";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${data.name}" <${process.env.SMTP_USER}>`,
    replyTo: data.email,
    to: process.env.CONTACT_EMAIL,
    subject: `[Formalize Contact] ${data.subject || "New enquiry"}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
    html: `
      <h2>New contact form submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Name</td><td style="padding:8px;border-bottom:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Email</td><td style="padding:8px;border-bottom:1px solid #ddd">${data.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Subject</td><td style="padding:8px;border-bottom:1px solid #ddd">${data.subject || "—"}</td></tr>
      </table>
      <h3 style="margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap;padding:12px;background:#f5f5f5;border-radius:4px">${data.message}</p>
    `,
  });
}
