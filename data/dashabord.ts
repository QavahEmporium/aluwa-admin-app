import { connectDB } from "@/lib/db";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";

export const getStatsData = async () => {
  await connectDB();

  const totalOrders = await Order.countDocuments();
  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.find({ role: "customer" }).countDocuments();

  return {
    totalOrders,
    totalRevenue,
    totalProducts,
    totalUsers,
  };
};
