// data/orders.ts
import { connectDB } from "@/lib/db";
import OrderItem from "@/models/order-item";

export async function listOrderItems(orderId: string) {
  await connectDB();

  return await OrderItem.find({ orderId }).lean();
}
