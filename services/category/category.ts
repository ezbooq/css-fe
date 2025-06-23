import { QueryFunction } from "@tanstack/react-query";
import { Option } from "../../types/common";
import { FileItem, UploadedFile } from "../../types/file";
import { createAxiosInstance } from "../axiosInstance";

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

export const getBusinessCategories: QueryFunction<Option[]> = async ({
  queryKey,
}): Promise<Option[]> => {
  const companyCode = localStorage.getItem("companyCode") || "ab";
  const [_key, { businessCode }] = queryKey as [
    string,
    {
      businessCode: string;
    }
  ];
  try {
    const response = await axiosInstance.get<SingleCategoryItem[]>(
      `/booking-console/catergory/get-all-with-files?companyCode=${companyCode}&businessCode=${businessCode}`
    );

    return response.data.map(({ id, name, file }: SingleCategoryItem) => ({
      id: String(id),
      name,
      image: file[0].url,
    }));
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
