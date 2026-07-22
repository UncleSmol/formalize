import "server-only";

import nodemailer from "nodemailer";
import { encodeHtml } from "@/lib/sanitize";

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
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Name</td><td style="padding:8px;border-bottom:1px solid #ddd">${encodeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Email</td><td style="padding:8px;border-bottom:1px solid #ddd">${encodeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd">Subject</td><td style="padding:8px;border-bottom:1px solid #ddd">${encodeHtml(data.subject || "—")}</td></tr>
      </table>
      <h3 style="margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap;padding:12px;background:#f5f5f5;border-radius:4px">${encodeHtml(data.message)}</p>
    `,
  });
}

/* ─── Order Emails (EFT flow) ────────────────────────────── */

interface OrderItemData {
  title: string;
  quantity: number;
  unit_price: number;
}

interface OrderEmailData {
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItemData[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  const transporter = getTransporter();

  const itemRows = data.items
    .map(
      (item) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee">${encodeHtml(item.title)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">R${item.unit_price.toFixed(2)}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right">R${(item.quantity * item.unit_price).toFixed(2)}</td></tr>`,
    )
    .join("");

  const bankingDetails = `
    <div style="margin:24px 0;padding:20px;background:#f5f8f5;border:1px solid #158b87;border-radius:4px">
      <h3 style="color:#158b87;margin:0 0 12px 0">Banking Details</h3>
      <p style="margin:4px 0"><strong>Bank:</strong> First National Bank</p>
      <p style="margin:4px 0"><strong>Account Holder:</strong> Formalize (Pty) Ltd</p>
      <p style="margin:4px 0"><strong>Account Number:</strong> 628 4157 2391</p>
      <p style="margin:4px 0"><strong>Branch Code:</strong> 255 005</p>
      <p style="margin:4px 0"><strong>Reference:</strong> <code style="background:#e8f0e8;padding:2px 6px;font-size:16px">${encodeHtml(data.orderRef)}</code></p>
    </div>
  `;

  const emailHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#158b87;color:#fff;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:24px">Order Confirmed</h1>
        <p style="margin:8px 0 0;opacity:0.9">Reference: <strong>${encodeHtml(data.orderRef)}</strong></p>
      </div>

      <div style="padding:24px">
        <p>Hi <strong>${encodeHtml(data.customerName)}</strong>,</p>
        <p>Thank you for your order. We have received your request and will process it once payment reflects.</p>

        <h3 style="color:#158b87;margin-top:24px">Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Price</th><th style="padding:8px;text-align:right">Total</th></tr></thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;margin-top:16px">
          <p style="margin:4px 0">Subtotal: R${data.subtotal.toFixed(2)}</p>
          ${data.shippingFee > 0 ? `<p style="margin:4px 0">Shipping: R${data.shippingFee.toFixed(2)}</p>` : ""}
          <p style="margin:4px 0;font-size:18px;font-weight:bold;color:#158b87">Total: R${data.total.toFixed(2)}</p>
        </div>

        ${bankingDetails}

        <p style="margin-top:24px;padding:12px;background:#fff3cd;border:1px solid #ffc107;border-radius:4px">
          <strong>Next step:</strong> Make an EFT using the reference above, then email your proof of payment to <strong>inquiries@formalize.co.za</strong> with the reference as subject.
        </p>
      </div>

      <div style="background:#f5f5f5;padding:16px 24px;text-align:center;font-size:12px;color:#666">
        Formalize (Pty) Ltd | inquiries@formalize.co.za
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#158b87;color:#fff;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:24px">New Order Received</h1>
        <p style="margin:8px 0 0;opacity:0.9">Reference: <strong>${encodeHtml(data.orderRef)}</strong></p>
      </div>

      <div style="padding:24px">
        <h3 style="color:#158b87">Customer Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:4px 8px;font-weight:bold">Name</td><td style="padding:4px 8px">${encodeHtml(data.customerName)}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold">Email</td><td style="padding:4px 8px">${encodeHtml(data.customerEmail)}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:bold">Phone</td><td style="padding:4px 8px">${encodeHtml(data.customerPhone)}</td></tr>
        </table>

        <h3 style="color:#158b87;margin-top:24px">Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Price</th><th style="padding:8px;text-align:right">Total</th></tr></thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;margin-top:16px">
          <p style="margin:4px 0;font-size:18px;font-weight:bold;color:#158b87">Total: R${data.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  `;

  const textItems = data.items.map((i) => `  ${i.quantity}x ${i.title} @ R${i.unit_price.toFixed(2)}`).join("\n");
  const orderText = `New Order: ${data.orderRef}\n\nCustomer: ${data.customerName} (${data.customerEmail})\nPhone: ${data.customerPhone}\n\nItems:\n${textItems}\n\nTotal: R${data.total.toFixed(2)}`;

  await Promise.all([
    transporter.sendMail({
      from: `"Formalize" <${process.env.SMTP_USER}>`,
      to: data.customerEmail,
      subject: `Order Confirmed — ${data.orderRef}`,
      text: `Thank you for your order ${data.orderRef}.\n\nTotal: R${data.total.toFixed(2)}\n\nPlease make an EFT using reference ${data.orderRef} and email your POP to inquiries@formalize.co.za`,
      html: emailHtml,
    }),
    transporter.sendMail({
      from: `"Formalize Orders" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL!,
      subject: `New Order — ${data.orderRef}`,
      text: orderText,
      html: adminHtml,
    }),
  ]);
}
