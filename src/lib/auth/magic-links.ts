import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

/**
 * Generates a WhatsApp Magic Link for a client.
 * Uses a secure random hex token, hashes it, saves the hash to the DB, 
 * and returns the clickable URL containing the raw token.
 */
export async function generateWhatsAppMagicLink(
  clientId: string,
  orgId: string,
  orgSlug: string
): Promise<{ url?: string; error?: any }> {
  // 1. Generate secure random 32-byte hex string
  const rawToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Hash it to store securely in the database
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  // Initialize Admin Client to bypass RLS for token insertion
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 3. Store hashed token in the DB
  const { error } = await supabaseAdmin
    .from('magic_links')
    .insert({
      token_hash: hashedToken,
      client_id: clientId,
      org_id: orgId,
      // expires_at is automatically handled by the database default (15 mins)
      // is_used is automatically set to false by default
    });

  if (error) {
    console.error("Failed to insert magic link:", error);
    return { error };
  }

  // 4. Construct the Magic Link URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const url = `${appUrl}/api/auth/whatsapp-verify?token=${rawToken}&redirect_to=/${orgSlug}/portal`;

  return { url };
}
