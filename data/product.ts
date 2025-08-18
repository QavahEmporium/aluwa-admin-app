"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import mongoose from "mongoose";

export async function listProducts(query?: {
  categoryId?: string;
  q?: string;
}) {
  await connectDB();
  const filter: any = {};
  if (query?.categoryId)
    filter.categoryId = new mongoose.Types.ObjectId(query.categoryId);
  if (query?.q) filter.$text = { $search: query.q };

  const products = (await Product.find(filter)
    .populate("categoryId", "name") // populate only `name` field from Category
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return products.map((p) => ({
    id: p._id.toString(),
    category: p.categoryId?.name || "", // populated field
    categoryId: p.categoryId?._id?.toString() || "",
    name: p.name,
    description: p.description,
    price: p.price,
    imageUrl: p.imageUrl,
    stock: p.stock,
  }));
}

export async function getProductById(id: string) {
  await connectDB();
  const product = (await Product.findById(id).lean()) as any;

  return {
    id: product._id.toString(),
    category: product.categoryId?.name || "", // populated field
    categoryId: product.categoryId?._id?.toString() || "",
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    stock: product.stock,
  };
}
