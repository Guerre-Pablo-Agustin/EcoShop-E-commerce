export interface Category {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  parentCategoryId: number;
  subCategories: string[];
}

export interface CreateCategoryDto {
  name: string;
  description: string;
  iconUrl: string;
  parentCategoryId: number;
}
