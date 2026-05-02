-- Add legal and compliance configuration to the organizations table
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS legal_configs JSONB DEFAULT '{
  "gstin": "",
  "business_name": "",
  "address": "",
  "grievance_officer_name": "",
  "grievance_officer_email": "",
  "refund_window_days": 7
}'::jsonb;
