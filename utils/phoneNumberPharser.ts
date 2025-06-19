import { parsePhoneNumberFromString } from "libphonenumber-js";

export function splitPhoneNumber(phone: string) {
  const parsed = parsePhoneNumberFromString(phone);
  if (!parsed) return { countryCode: null, phoneNumber: phone }; // Fallback for invalid input
  return {
    countryCode: `+${parsed.countryCallingCode}`,
    phoneNumber: parsed.nationalNumber,
  };
}
