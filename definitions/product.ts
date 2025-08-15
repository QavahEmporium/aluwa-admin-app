// src/definitions/product.ts
import { Types } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  sku?: string;
  stock: number;
  status?: "active" | "draft";
  categoryId: Types.ObjectId | string;
  tags?: string[];
  attributes?: Record<string, any>;
}

export interface ICategory {
  name: string;
  description?: string;
}
