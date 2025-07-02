import { CheckOutForm } from "@/types/checkOutFormContext";
import { createContext } from "react";

export const initialCheckOutForm: CheckOutForm = {
  basiceBusinessData: {
    serviceModes: 0,
  },
  generalDetails: {
    serviceMode: 0,
    appointmentDate: undefined,
    appointmentTime: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    countryCode: undefined,
    phoneNumber: undefined,
  },
  addressDetails: {
    address: undefined,
    apartmentNumber: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    note: undefined,
  },
};

type AppContextValue = {
  checkOutForm: CheckOutForm;
  setCheckOutForm: (form: CheckOutForm) => void;
  resetCheckOutForm: () => void;
};

export const CheckOutFormContext = createContext<AppContextValue>({
  checkOutForm: initialCheckOutForm,
  setCheckOutForm: () => {},
  resetCheckOutForm: () => {},
});
