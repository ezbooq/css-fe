type Package = {
  uploadFiles: (File | string)[] | undefined;
  serviceId: string | undefined;
  categoryId: string | undefined;
  tire1Id: string | undefined;
  tire2Id: string | undefined;
};
type ContactInfo = {
  address: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  countryCode: string | undefined;
};
type GeneralDetails = {
  serviceType: "on-site" | "off-site" | undefined;
  appointmentDate: string | undefined;
  appointmentTime: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  countryCode: string | undefined;
  phoneNumber: string | undefined;
};
type Address = {
  address?: string | undefined;
  apartmentNumber?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  note?: string | undefined;
};
export type CheckOutForm = {
  generalDetails: GeneralDetails;
  address: Address;
};
