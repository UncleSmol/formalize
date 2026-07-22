import "server-only";

interface InvoiceData {
  orderRef: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string | null;
  items: {
    title: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export function generateInvoiceHtml(data: InvoiceData): string {
  const itemRows = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #ddd">${escapeHtml(item.title)}</td>
          <td style="padding:12px;border-bottom:1px solid #ddd;text-align:center">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #ddd;text-align:right">R${item.unitPrice.toFixed(2)}</td>
          <td style="padding:12px;border-bottom:1px solid #ddd;text-align:right">R${(item.quantity * item.unitPrice).toFixed(2)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; font-size: 14px; color: #333; margin: 0; padding: 40px; }
    .header { border-bottom: 3px solid #158b87; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { font-size: 28px; color: #158b87; margin: 0; }
    .header p { color: #666; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #158b87; color: #fff; padding: 12px; text-align: left; font-size: 13px; }
    th.right { text-align: right; }
    td { padding: 12px; border-bottom: 1px solid #eee; }
    .totals { margin-top: 20px; text-align: right; }
    .totals p { margin: 4px 0; }
    .totals .grand { font-size: 20px; font-weight: bold; color: #158b87; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="header">
    <h1>INVOICE</h1>
    <p>Formalize (Pty) Ltd</p>
    <p>${escapeHtml(data.customerCompany || "N/A")}</p>
  </div>

  <table>
    <tr>
      <td style="width:50%;border:none">
        <strong>Bill To:</strong><br>
        ${escapeHtml(data.customerName)}<br>
        ${escapeHtml(data.customerEmail)}<br>
        ${data.customerCompany ? escapeHtml(data.customerCompany) : ""}
      </td>
      <td style="width:50%;border:none;text-align:right">
        <strong>Invoice #:</strong> ${escapeHtml(data.orderRef)}<br>
        <strong>Date:</strong> ${new Date(data.createdAt).toLocaleDateString("en-ZA")}<br>
      </td>
    </tr>
  </table>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th style="text-align:center">Qty</th>
        <th class="right">Unit Price</th>
        <th class="right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
    </tbody>
  </table>

  <div class="totals">
    <p>Subtotal: R${data.subtotal.toFixed(2)}</p>
    ${data.shippingFee > 0 ? `<p>Shipping: R${data.shippingFee.toFixed(2)}</p>` : ""}
    <p class="grand">Total: R${data.total.toFixed(2)}</p>
  </div>

  <div class="footer">
    <p>Formalize (Pty) Ltd | inquiries@formalize.co.za</p>
    <p>Payment terms: EFT within 7 days. Use order reference as payment reference.</p>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
