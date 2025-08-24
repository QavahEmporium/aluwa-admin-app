"use client";

import { User as UserIcon, ChevronRight } from "lucide-react";
import { BackButton } from "@/components/ui/buttons";
import Link from "next/link";

type OrderItem = {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  orders: Order[];
};

export default function UserDetailClient({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="mb-3">
        <BackButton name="Customer Detail" />
      </div>

      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border border-gray-300">
          <UserIcon className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-center md:text-left">
            {user.name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 px-4 md:hidden">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>

        {user.orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {user.orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
              >
                {/* Left content */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    Order #{order.id.slice(-6)}
                  </span>
                  <span className="font-medium text-gray-800">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit
                      ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Right arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>

        {user.orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2 text-center">{order.status}</td>
                    <td className="px-4 py-2 text-right">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
