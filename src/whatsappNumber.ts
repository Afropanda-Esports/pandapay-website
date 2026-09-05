const DEFAULT_WHATSAPP_NUMBER = "2347043864368";
const TEST_RECIPIENT_NUMBER = "2348083262539";

export function normalizeWhatsappNumber(value?: string): string {
  if (!value || /x/i.test(value)) return DEFAULT_WHATSAPP_NUMBER;

  const digits = value.replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(digits) || digits === TEST_RECIPIENT_NUMBER) {
    return DEFAULT_WHATSAPP_NUMBER;
  }

  return digits;
}
