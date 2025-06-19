import { Option } from "../types/common";
export const findOptionById = (
  optionList: Option[],
  optionId: string
): Option | undefined => {
  for (const option of optionList) {
    if (option.id === optionId) {
      return option;
    }
    if (option.children) {
      const found = findOptionById(option.children, optionId);
      if (found) return found;
    }
  }
  return undefined;
};
