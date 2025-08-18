"server-only";

import { connectDB } from "@/lib/db";
import Category from "@/models/category";

export async function createCategoryAction(category: {
  name: string;
  description: string;
}) {
  await connectDB();
  const exists = await Category.findOne({ name: category.name });

  if (exists) throw new Error("Category with this name/slug already exists");

  return Category.create(category);
}

export async function updateCategory(
  id: string,
  category: {
    name: string;
    description: string;
  }
) {
  await connectDB();
  await Category.findByIdAndUpdate(id, category, { new: true });
}

export async function deleteCategory(id: string) {
  await connectDB();
  await Category.findByIdAndDelete(id);
  return { ok: true };
}

export async function togglePublishCategory(id: string) {
  await connectDB();
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  category.isPublished = !category.isPublished;
  try {
    await category.save();
    console.log("Success updating publish category");
  } catch (e) {
    console.log("Error updating publish category");
  }
}
