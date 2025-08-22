import { connectDB } from "@/lib/db";
import User from "@/models/user";
import Order from "@/models/order";
import { Types } from "mongoose";

export async function listUsers() {
  await connectDB();

  // aggregate orders per user
  const orderStats = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpend: { $sum: "$totalAmount" },
      },
    },
  ]);

  // make quick lookup by userId
  const orderStatsMap = orderStats.reduce((acc, stat) => {
    acc[stat._id.toString()] = {
      totalOrders: stat.totalOrders,
      totalSpend: stat.totalSpend,
    };
    return acc;
  }, {} as Record<string, { totalOrders: number; totalSpend: number }>);

  // fetch users
  const users = (await User.find().lean()) as any[];

  return users.map((u) => ({
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    totalOrders: orderStatsMap[u._id.toString()]?.totalOrders || 0,
    totalSpend: orderStatsMap[u._id.toString()]?.totalSpend || 0,
  }));
}

export async function getUserWithOrders(userId: string) {
  await connectDB();

  const user = await User.findById(userId).lean();
  if (!user) return null;

  const orders = (await Order.find({ userId: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt as any).toISOString(),
    orders: orders.map((o) => ({
      id: o._id.toString(),
      status: o.status,
      totalAmount: o.totalAmount,
      createdAt: new Date(o.createdAt as any).toISOString(),
      items: o.items?.map((i: any) => ({
        productId: i.productId?.toString(),
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    })),
  };
}
