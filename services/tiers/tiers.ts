import { QueryFunction } from "@tanstack/react-query";
import { createAxiosInstance } from "../axiosInstance";
import { Tier } from "@/types/tier";
const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://13.53.133.158:2504/ezzy-booking/";
const axiosInstance = createAxiosInstance(baseURL);
export const getTiersByParent: QueryFunction<Tier[]> = async ({
  queryKey,
}): Promise<Tier[]> => {
  const companyCode = localStorage.getItem("companyCode") || "ab";
  const [_key, { businessCode, categoryId, parentId }] = queryKey as [
    string,
    {
      businessCode: string;
      categoryId: string;
      parentId?: string;
    }
  ];
  try {
    const params: Record<string, string> = {
      companyCode,
      businessCode,
      categoryId,
    };
    if (parentId) {
      params.parentId = parentId;
    }
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get<Tier[]>(
      `/booking-console/tier/get-all-with-files?${queryString}`
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
