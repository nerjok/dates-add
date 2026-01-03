export function validateLtPhone(phone: string): string | null {
  const value = phone.trim();
  const regex = /^(?:\+3706|06)\d{7}$/;

  if (value.length === 0) {
    return "Phone is required.";
  }

  if (!regex.test(value)) {
    return "Phone must be +3706XXXXXXX or 06XXXXXXX.";
  }

  return null;
}
