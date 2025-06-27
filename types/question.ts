import { Option } from "./common";

export type Question = {
  id: string;
  question: string;
  type: 0 | 1;
  options?: Option[];
};

export type RaWQuestion = {
  question: string;
  type: 0 | 1;
  options?: string[];
};
