import { Brand } from "./Brand.types";


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  environmentalData: {
    carbonFootprint: number;
    material: string;
    countryOfOrigin: string;
    energyConsumption: number;
    recyclablePercentage: number;
    notes?: string;
  };
  certificationIds?: number[];
  certificationNames?: string[];
  stock: number;
  brandId: number;
  categoryId: number;
  isActive: boolean;
}