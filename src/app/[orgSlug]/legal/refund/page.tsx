import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { LegalDocViewer } from "@/components/executive/LegalDocViewer";
import { getRefundTemplate } from "@/lib/compliance/legal-templates";

export default async function RefundPolicyPage({ params }: { params: { orgSlug: string } }) {
  const supabase = await createClient();
  
  const { data: org } = await supabase
    .from("organizations")
    .select("name, legal_configs")
    .eq("slug", params.orgSlug)
    .single();

  if (!org) {
    notFound();
  }

  const defaultConfigs = {
    businessName: org.name,
    gstin: "PENDING_GSTIN",
    address: "Registered Address Pending",
    grievanceOfficer: "Grievance Officer",
    contactEmail: "legal@example.com",
    refundWindowDays: 7
  };

  const businessData = {
    businessName: org.legal_configs?.business_name || defaultConfigs.businessName,
    gstin: org.legal_configs?.gstin || defaultConfigs.gstin,
    address: org.legal_configs?.address || defaultConfigs.address,
    grievanceOfficer: org.legal_configs?.grievance_officer_name || defaultConfigs.grievanceOfficer,
    contactEmail: org.legal_configs?.grievance_officer_email || defaultConfigs.contactEmail,
    refundWindowDays: org.legal_configs?.refund_window_days || defaultConfigs.refundWindowDays,
  };

  const content = getRefundTemplate(businessData);

  return (
    <LegalDocViewer
      title="Refund Policy"
      content={content}
      businessData={businessData}
      docType="refund"
    />
  );
}
