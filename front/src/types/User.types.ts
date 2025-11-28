import { Order } from "./Order.types";

// Interfaz base
export interface BaseUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'brandAdmin';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Extensión para Customer
export interface CustomerUser extends BaseUser {
  userType: 'customer';
  shippingAddress: string;
  billingAddress: string;
  phone: string;
  ecoWallet: { /* tipo EcoWallet */ };
  orderHistory: Order[]; // asume tipo Order
}

// Extensión para BrandAdmin
export interface BrandAdminUser extends BaseUser {
  userType: 'brandAdmin';
  brand: { /* tipo Brand */ };
  businessEmail: string;
  businessPhone: string;
}

// Unión discriminada
export type User = CustomerUser | BrandAdminUser;
