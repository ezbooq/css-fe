import { FileItem } from "./file";

export type ContactDetails = {
  phone: string | null;
  countryCode: string | null;
  email: string | null;
  location: string | null;
  address: string | null;
};
export type BusinessData = {
  id: string;
  name: string;
  businessCode: string;
  status: 0 | 1;
  horizontalScaleCount: number;
  verticalScaleCount: number;
  address: string | null;
  email: string | null;
  countryCode: string | null;
  contactNumber: string | null;
  url: string;
  serviceMode: string | null;
  locationLink: string | null;
  logoPlacement: 0 | 1 | null;
  buttonColor: string | null;
  fontType: string | null;
  cardBackgroundColor: string | null;
  fontColor: string | null;
  logos: FileItem[];
  bannerImages: FileItem[];
};
