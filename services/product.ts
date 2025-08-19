// src/server/services/productService.ts
"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { IProduct } from "@/definitions/product";

export async function createProduct(input: any) {
  await connectDB();
  const exists = await Product.findOne({ name: input.name });
  if (exists) throw new Error("Product slug already exists");

  try {
    await Product.create(input);
  } catch (e) {
    console.log(e);
  }
}

export async function updateProduct(id: string, input: any) {
  await connectDB();
  return Product.findByIdAndUpdate(id, input, { new: true });
}

export async function deleteProduct(id: string) {
  await connectDB();
  await Product.findByIdAndDelete(id);
  return { ok: true };
}

export async function togglePublishProduct(id: string) {
  await connectDB();
  const product = await Product.findById(id);
  if (!product) throw new Error("Category not found");

  product.isPublished = !product.isPublished;
  try {
    await product.save();
    console.log("Success updating publish product");
  } catch (e) {
    console.log("Error updating publish product");
  }
}
