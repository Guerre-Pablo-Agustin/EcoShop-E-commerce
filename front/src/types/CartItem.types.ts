import { Product } from "./Product.types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  itemCarbonFootprint: number;
}