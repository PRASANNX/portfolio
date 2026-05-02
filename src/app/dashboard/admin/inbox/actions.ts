"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function replyToInquiry(id: string, message: string) {
  const supabase = await createClient();
  
  // Example action: mark inquiry as answered or send an email/WhatsApp
  // For now, we just update the status
  const { error } = await supabase
    .from("inquiries")
    .update({ status: "replied" })
    .eq("id", id);
    
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/dashboard/admin/inbox");
}

export async function sendPaymentReminder(id: string) {
  const supabase = await createClient();
  
  // Example action: trigger a payment reminder
  const { error } = await supabase
    .from("payments")
    .update({ status: "reminder_sent" })
    .eq("id", id);
    
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/dashboard/admin/inbox");
}

export async function markMessageAsRead(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("client_messages")
    .update({ is_read: true })
    .eq("id", id);
    
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/dashboard/admin/inbox");
}
