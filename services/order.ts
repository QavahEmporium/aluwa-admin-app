import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function updateOrderStatus(id: string, status: string) {
  await connectDB();
  await Order.findByIdAndUpdate(id, { status }, { new: true });
}
