import { FileItem } from "./file";

export type Tier = {
  id: string;
  name: string;
  categoryId: string | null;
  parentId: string | null;
  description: string;
  slotsPerDay: number;
  serviceDuration: number;
  price: number;
  files: FileItem[];
};
