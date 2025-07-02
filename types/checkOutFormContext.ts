type basicBusinessData = {
  serviceModes: number;
};

type GeneralDetails = {
  serviceMode: number;
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
  basiceBusinessData: basicBusinessData;
  generalDetails: GeneralDetails;
  addressDetails: Address;
  questionAnswers?: Record<string, string>;
};
