"use server";
import {
  createCategoryAction,
  deleteCategory,
  togglePublishCategory,
  updateCategory,
} from "@/services/category";
import { revalidatePath } from "next/cache";

export async function createNewCategory(category: {
  name: string;
  description: string;
}) {
  await createCategoryAction(category);
  revalidatePath("/categories");
}

export async function updateCategoryAction(
  id: string,
  category: {
    name: string;
    description: string;
  }
) {
  await updateCategory(id, category);
  revalidatePath("/categories");
}

export async function deleteCategoryAction(id: string) {
  await deleteCategory(id);
  revalidatePath("/categories");
}

export async function togglePublishCategoryAction(id: string) {
  await togglePublishCategory(id);
  revalidatePath("/categories");
}
