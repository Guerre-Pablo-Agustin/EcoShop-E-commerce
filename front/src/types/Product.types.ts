import { Brand } from "./Brand.types";


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  impact: {
    carbonFootprint: number; // kg CO2
    recyclable: number; // percentage
    waterUsage: number; // liters
    transportDistance: number; // km
  };
  stock: number;
  brand: Brand,
  certifications: string[];
  materials: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  origin: {
    text: string;
  };
  rating: number;
  reviews: number;
  isActive: boolean;
}