import { Option } from "./common";

export type Question = {
  id: string;
  question: string;
  type: "Single" | "Multiple";
  options?: Option[];
};
