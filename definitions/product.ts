// src/definitions/product.ts
import { Types } from "mongoose";
import { z } from "zod";
/* 
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
} */

export interface ICategory {
  name: string;
  description?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: Types.ObjectId | string;
  imageUrl: string;
}

export type ProductFormState = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    categoryId?: string[];
    imageUrl?: string[];
    global?: string[]; // 👈 added global here
  };
  message: string;
};
