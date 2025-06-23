import { QueryFunction } from "@tanstack/react-query";
import { Option } from "../../types/common";
import { FileItem, UploadedFile } from "../../types/file";
import { createAxiosInstance } from "../axiosInstance";
import { BusinessData } from "@/types/business";

export type CreateCategoryArg = {
  name: string;
  businessCode: string;
  fileList: UploadedFile[];
};

type SingleCategoryItem = {
  id: string;
  name: string;
  file: FileItem[];
};
const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://13.53.133.158:2504/ezzy-booking/";
const axiosInstance = createAxiosInstance(baseURL);

export const getBusinessByCode: QueryFunction<BusinessData> = async ({
  queryKey,
}): Promise<BusinessData> => {
  const [_key, { businessCode, companyCode }] = queryKey as [
    string,
    {
      businessCode: string;
      companyCode: string;
    }
  ];
  try {
    const response = await axiosInstance.get<BusinessData>(
      `/booking-console/business/get-by-business-code/${companyCode}/${businessCode}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
