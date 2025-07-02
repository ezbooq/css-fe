export type ProductType = "PACKAGE" | "ADDONS";

export type CartItem = {
  id: string;
  businessCode: string;
  name: string;
  price: number;
  serviceDuration: number;
  type: ProductType;
  categoryId: string;
  level: number;
  parentId?: string;
  quantity?: number;
};
