// data/orders.ts
import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export async function listAllOrders() {
  await connectDB();

  const orders = await Order.find({}).populate("userId", "name email").lean();

  const formattedOrders = orders.map((order: any) => ({
    id: order._id.toString(),
    customer: order.userId?.name || "Unknown",
    date: new Date(order.createdAt).toISOString().split("T")[0],
    total: order.totalAmount,
    status: order.status,
  }));

  return formattedOrders;
}

export async function getOrderById(id: string) {
  await connectDB();

  return await Order.findById(id)
    .populate("userId", "name email")
    .populate("shippingAddressId")
    .lean();
}
