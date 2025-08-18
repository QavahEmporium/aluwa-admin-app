// src/lib/validation.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2).trim(),
  slug: z.string().toLowerCase(),
  description: z.string(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().regex(/^\d+$/, "Price must be a number"),
  stock: z.string().regex(/^\d+$/, "Stock must be a number"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z.string(),
});

export type ProductForm = z.infer<typeof productFormSchema>;
/* 
export const productSchema = z.object({
  name: z.string().min(2).trim(),
  slug: z.string().min(2).trim().toLowerCase(),
  description: z.string().min(1, "Description is required."),
  price: z.coerce.number().min(0),
  images: z.array(z.string().url()).optional().default([]),
  sku: z.string().optional(),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["active", "draft"]).default("active"),
  categoryId: z.string().min(1),
  tags: z.array(z.string()).optional().default([]),
  attributes: z.record(z.string(), z.any()).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
 */