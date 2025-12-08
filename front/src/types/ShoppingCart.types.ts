import { CartItem } from "./CartItem.types";

export interface ShoppingCart {
  id: string;
  items: CartItem[];
  total: number;
  estimatedCarbonFootprint?: number;
  createdAt: Date;
  updatedAt: Date;
}
