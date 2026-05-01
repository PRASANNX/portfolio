/**
 * PRX Startup OS — Email Templates (Resend compatible HTML)
 */

export function getInvoiceEmailHtml(
  clientName: string,
  invoiceNumber: string,
  amount: string,
  dueDate: string,
  paymentUrl: string,
  orgName: string,
  accentColor: string = "#FF5F1F"
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-w-xl mx-auto padding: 40px 20px; }
    .header { margin-bottom: 30px; }
    .org-name { font-size: 24px; font-weight: 800; color: #121212; letter-spacing: -0.5px; }
    .title { font-size: 20px; font-weight: 600; margin-bottom: 20px; }
    .details { background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #f3f4f6; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .detail-label { color: #6b7280; font-size: 14px; }
    .detail-value { font-weight: 600; font-size: 14px; }
    .button { display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-bottom: 30px; text-align: center; }
    .footer { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px; border-top: 1px solid #f3f4f6; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="org-name">${orgName}</div>
    </div>
    
    <div class="title">New Invoice from ${orgName}</div>
    <p>Hi ${clientName},</p>
    <p>Here is invoice <strong>${invoiceNumber}</strong> for ${amount}.</p>
    
    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Amount Due:</span>
        <span class="detail-value">${amount}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Due Date:</span>
        <span class="detail-value">${dueDate}</span>
      </div>
    </div>
    
    <a href="${paymentUrl}" class="button" style="background-color: ${accentColor};">Pay Invoice</a>
    
    <p>If you have any questions, please reply to this email.</p>
    <p>Thanks,<br>The ${orgName} Team</p>
    
    <div class="footer">
      Powered by PRX Startup OS
    </div>
  </div>
</body>
</html>
  `;
}
