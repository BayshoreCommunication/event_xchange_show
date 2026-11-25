import emailjs from "@emailjs/browser";

export type EmailJsConfig = { serviceId: string; templateId: string; publicKey: string };

/**
 * Sends one email through EmailJS. Throws when the send fails, so the form
 * can show its error popup.
 */
export async function sendEmail(config: EmailJsConfig, params: Record<string, string>) {
  try {
    await emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
  } catch (err) {
    // EmailJS rejects with { status, text }
    const e = err as { status?: number; text?: string };
    throw new Error(`EmailJS send failed${e?.status ? ` (${e.status})` : ""}: ${e?.text || String(err)}`);
  }
}
