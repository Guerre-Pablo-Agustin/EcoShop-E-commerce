import { Payment } from "./Payment.types";
import { Product } from "./Product.types";
import { CustomerUser } from "./User.types";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface OrderItem {
  id: number;
  product?: Product;
  productId?: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  subtotal?: number;
  totalPrice?: number;
  itemCarbonFootprint?: number;
  carbonFootprint?: number;
}

export interface ShippingAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Order {
  id: number;
  customer: CustomerUser;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  totalCarbonFootprint: number;
  co2Saved: number;
  status: OrderStatus;
  shippingAddress: string | ShippingAddress | null;
  payment: Payment;
  orderDate: Date | string;
  shippingDate?: Date | string | null;
  deliveryDate?: Date | string | null;
  ecoPointsEarned?: number | null;
}
