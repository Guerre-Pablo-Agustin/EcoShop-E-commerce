import { CartItem } from "./CartItem.types";

export interface ShoppingCart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  estimatedCarbonFootprint?: number;
  createdAt: Date;
  updatedAt: Date;
}
