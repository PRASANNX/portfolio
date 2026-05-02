import { jsPDF } from 'jspdf';
import { BusinessLegalData, getPrivacyTemplate, getRefundTemplate, getTermsTemplate } from './legal-templates';

export async function generateRazorpayKYCDocs(data: BusinessLegalData, type: 'terms' | 'privacy' | 'refund') {
  const doc = new jsPDF();
  
  // Design Constraint: Executive Minimalist (Pure Typography)
  doc.setFont("helvetica", "bold"); 
  doc.setFontSize(22);
  
  const titleMap = {
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund Policy'
  };

  doc.text(`${data.businessName} - ${titleMap[type]}`, 20, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // text-gray-500
  doc.text(`GSTIN: ${data.gstin} | Address: ${data.address}`, 20, 28);
  
  doc.setTextColor(0, 0, 0); // text-black
  doc.setFontSize(12);

  // Get the appropriate template text
  let bodyText = "";
  if (type === 'terms') bodyText = getTermsTemplate(data);
  if (type === 'privacy') bodyText = getPrivacyTemplate(data);
  if (type === 'refund') bodyText = getRefundTemplate(data);
  
  // Clean up starting newlines
  bodyText = bodyText.trim();

  const splitText = doc.splitTextToSize(bodyText, 170);
  doc.text(splitText, 20, 45);

  // Auto-save file
  doc.save(`${data.businessName.replace(/\\s+/g, '-').toLowerCase()}-${type}.pdf`);
}
