export interface Product {
  id: string;
  name: string;
  description: string;
  image: string[];
  features: string[];
  renting_roles: string[];
  dimensions: string[];
  amenities: string[];
  category: string;
  video: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
