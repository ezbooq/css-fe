export type ProductType = "PACKAGE" | "ADDONS";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  duration: number;
  type: ProductType;
  categoryId: string;
  level: number;
  parentId?: string;
};
