import { getStatsData } from "@/data/dashabord";
import { Package, ShoppingCart, Users } from "lucide-react";

export default async function DashboardHome() {
  const stats = await getStatsData();

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition">
        <div className="p-3 bg-blue-100 rounded-full">
          <ShoppingCart className="text-blue-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-green-50 to-white hover:shadow-md transition">
        <div className="p-3 bg-green-100 rounded-full">
          <span className="text-green-600 text-lg font-bold">R</span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold">R {stats.totalRevenue}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition">
        <div className="p-3 bg-purple-100 rounded-full">
          <Package className="text-purple-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Products</p>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-yellow-50 to-white hover:shadow-md transition">
        <div className="p-3 bg-yellow-100 rounded-full">
          <Users className="text-yellow-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
