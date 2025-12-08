import { Brand } from "./Brand.types";


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  environmentalData: {
    carbonFootprint: number;
    material: string;
    countryOfOrigin: string;
    energyConsumption: number;
    recyclablePercentage: number;
    notes?: string;
  };
  certificationIds: number[];
  stock: number;
  brandId: number;
  categoryId: number;
  isActive: boolean;
}