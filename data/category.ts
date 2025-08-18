"use server";
import { connectDB } from "@/lib/db";
import Category from "@/models/category";

export async function listCategories() {
  await connectDB();
  const categories = Category.find().sort({ createdAt: -1 }).lean();
  return (await categories).map((cat: any) => ({
    id: cat._id.toString(),
    name: cat.name,
    description: cat.description,
    isPublished: cat.isPublished,
  }));
}

export async function getCategoryById(id: string) {
  await connectDB();
  return Category.findById(id).lean();
}
