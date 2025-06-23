import { FileItem } from "./file";

export type ContactDetails = {
  phone: string | null;
  countryCode: string | null;
  email: string | null;
  location: string | null;
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
  logoPlacement: "left" | "right" | null;
  buttonColor: string | null;
  cardBackgroundColor: string | null;
  fontColor: string | null;
  logos: FileItem[];
  bannerImages: FileItem[];
};
