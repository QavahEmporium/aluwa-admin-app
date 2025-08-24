"use server";
import { revalidatePath } from "next/cache";
import { ProductFormState } from "@/definitions/product";
import { productFormSchema } from "@/validations/products";

import {
  createProduct,
  deleteProduct,
  togglePublishProduct,
  updateProduct,
} from "@/services/product";
import { Types } from "mongoose";
import { redirect } from "next/navigation";
import { deleteFileByNameAction } from "./file";

export async function deleteProductAction(id: string, imageUrl: string) {
  await deleteFileByNameAction(imageUrl);
  await deleteProduct(id);
  revalidatePath("/products");
}

export async function createProductAction(
  productId: string,
  prevState: ProductFormState | undefined,
  formData: FormData
) {
  try {
    const validatedFields = productFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!validatedFields.success) {
      const state: ProductFormState = {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Oops, I think there's a mistake with your inputs.",
      };

      return state;
    }

    const { name, description, price, stock, categoryId, imageUrl } =
      validatedFields.data;

    const obj = {
      name,
      description,
      price,
      stock,
      categoryId: new Types.ObjectId(categoryId),
      imageUrl,
    };

    if (productId) await updateProduct(productId, obj);
    else await createProduct(obj);
  } catch (error: any) {
    return {
      message: "Failed to create product",
      errors: { global: error.message },
    };
  }
  revalidatePath("/products");
  redirect("/products");
}

export async function togglePublishProductAction(id: string) {
  await togglePublishProduct(id);
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
}
