"use server";
import { updateOrderStatus } from "@/services/order";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(id: string, status: string) {
  await updateOrderStatus(id, status);
  revalidatePath(`/orders/${id}`);
  revalidatePath(`/orders`);
}
