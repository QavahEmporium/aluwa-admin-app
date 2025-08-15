"use server";
import {
  createCategoryAction,
  deleteCategory,
  updateCategory,
} from "@/services/category";
import { revalidatePath } from "next/cache";

export async function createNewCategory(category: {
  name: string;
  description: string;
}) {
  createCategoryAction(category);
  revalidatePath("/categories");
}

export async function updateCategoryAction(
  id: string,
  category: {
    name: string;
    description: string;
  }
) {
  return await updateCategory(id, category);
}

export async function deleteCategoryAction(id: string) {
  deleteCategory(id);
  revalidatePath("/categories");
}
