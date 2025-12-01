import { Payment } from "./Payment.types";
import { Product } from "./Product.types";
import { CustomerUser } from "./User.types";

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';


export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    itemCarbonFootprint: number;
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
    shippingAddress: string;
    payment: Payment;
    orderDate: Date;
    shippingDate: Date;
    deliveryDate: Date;
    ecoPointsEarned: number;
}

