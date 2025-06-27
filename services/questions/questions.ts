import { QueryFunction } from "@tanstack/react-query";
import { ApiResponse } from "../../types/common";
import { Question, RaWQuestion } from "../../types/question";
import { createAxiosInstance } from "../axiosInstance";
const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://13.53.133.158:2504/ezzy-booking/";
const axiosInstance = createAxiosInstance(baseURL);
type CreateBulkQuestionsArg = {
  question: RaWQuestion[];
  businessCode: string;
};
type CreateBulkQuestionsResponse = ApiResponse<boolean>;
export const createBulkQuestions = async (
  arg: CreateBulkQuestionsArg
): Promise<CreateBulkQuestionsResponse> => {
  const companyCode = localStorage.getItem("companyCode") || "ab";
  const userId = localStorage.getItem("userId") || "";
  let submitData = {
    companyCode: companyCode,
    businessCode: arg.businessCode,
    list: arg.question,
    userId: Number(userId),
  };
  try {
    const response = await axiosInstance.post<CreateBulkQuestionsResponse>(
      `/booking-console/question/create/`,
      submitData
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

{
  /**<-------------Fetcher----------> */
}
type QuestionResponse = {
  singleQuestions: Question[];
  multipleQuestions: Question[];
};

export const getQuestions: QueryFunction<QuestionResponse> = async ({
  queryKey,
}): Promise<QuestionResponse> => {
  const [_key, { businessCode, companyCode }] = queryKey as [
    string,
    {
      businessCode: string;
      companyCode: string;
    }
  ];
  try {
    const response = await axiosInstance.get<Question[]>(
      `/booking-console/question/get-all?companyCode=${companyCode}&businessCode=${businessCode}`
    );

    const singleQuestions = response.data.filter((q) => q.type === 0);
    const multipleQuestions = response.data.filter((q) => q.type === 1);

    return { singleQuestions, multipleQuestions };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
