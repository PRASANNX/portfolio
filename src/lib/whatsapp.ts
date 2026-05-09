/**
 * PRX Startup OS — WhatsApp Integration (Meta Cloud API)
 */
import { generateWhatsAppMagicLink } from './auth/magic-links';

interface WhatsAppMessagePayload {
  messaging_product: "whatsapp";
  to: string;
  type: "template";
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: "body" | "header" | "button";
      parameters: Array<{
        type: "text" | "currency" | "date_time" | "document" | "image" | "video";
        text?: string;
        // ... other types
      }>;
    }>;
  };
}

export async function sendWhatsAppTemplate(
  toPhone: string,
  templateName: string,
  parameters: string[] = [],
  languageCode: string = "en",
  retries: number = 2
): Promise<{ success: boolean; messageId?: string; error?: any }> {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("WhatsApp API credentials missing.");
    return { success: false, error: "Missing credentials" };
  }

  // Format phone (remove +, keep country code, no spaces)
  const cleanPhone = toPhone.replace(/\D/g, "");

  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to: cleanPhone,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  };

  if (parameters.length > 0) {
    payload.template.components = [
      {
        type: "body",
        parameters: parameters.map((p) => ({
          type: "text",
          text: p,
        })),
      },
    ];
  }

  let attempt = 0;
  while (attempt <= retries) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.messages && data.messages[0]) {
        return { success: true, messageId: data.messages[0].id };
      } else {
        throw new Error(data.error?.message || "WhatsApp API Error");
      }
    } catch (error: any) {
      attempt++;
      if (attempt > retries) {
        return { success: false, error: error.message };
      }
      // Simple backoff: 1s, 2s, 4s...
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
    }
  }

  return { success: false, error: "Max retries exceeded" };
}

/**
 * Sends a WhatsApp notification to a client with a passwordless magic link to view a document.
 */
export async function sendDocumentWithMagicLink(
  toPhone: string,
  clientId: string,
  orgId: string,
  orgSlug: string,
  documentName: string
) {
  // 1. Generate the secure magic link
  const { url, error } = await generateWhatsAppMagicLink(clientId, orgId, orgSlug);
  
  if (error || !url) {
    console.error("Failed to generate magic link for WhatsApp:", error);
    return { success: false, error: "Magic link generation failed" };
  }

  // 2. Send the message via Meta API using a pre-approved template.
  // Template format: "Your document {{1}} is ready. Tap to view securely: {{2}}"
  const response = await sendWhatsAppTemplate(
    toPhone,
    "document_ready_magic_link", // This template must be approved in Meta Business Manager
    [documentName, url]
  );

  return response;
}
