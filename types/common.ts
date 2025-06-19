import { CountryCode } from "libphonenumber-js";
import { type InfoRow } from "./layout";

export type Country = {
  code: CountryCode;
  dialingCode: string;
};

export type Option = {
  id: string;
  name: string;
  status?: string;
  image?: string;
  children?: Option[];
};
export type DetailType = {
  id: number;
  name: string;
  count?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  error: string | null;
  data: T;
};

export type PaginationResponse<T> = {
  page: number;
  size: number;
  hasMore: boolean;
  records: T[];
};
export type ItemDetails = {
  images?: (string | File)[];
  itemData: InfoRow[];
};
