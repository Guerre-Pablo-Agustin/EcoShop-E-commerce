import { Order } from "./Order.types";

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentMethod =
  | "MERCADO_PAGO"
  | "STRIPE"
  | "PAYPAL"
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "BANK_TRANSFER";

export type GatewayType = "MERCADO_PAGO" | "STRIPE" | "PAYPAL";

export interface Payment {
  id: number;
  order: Order;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  paymentDate: Date;
  gateway: PaymentGateway;
}

export interface PaymentGateway {
  name: string;
  apiUrl: string;
  apiKey: string;
  type: GatewayType;
}
