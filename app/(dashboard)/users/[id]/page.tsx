// app/(dashboard)/users/[id]/page.tsx
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { customers } from "@/data/customers"; // mock data
import { orders } from "@/constants/orders"; // mock orders data

export default function CustomerDetailPage() {
  const params = useParams();
  const customer = customers.find((c) => c.id === Number(params.id));

  if (!customer) {
    return <p className="p-4 text-center">Customer not found.</p>;
  }

  const customerOrders = orders.filter((o) => o.customerId === customer.id);

  return (
    <div className="flex flex-col gap-6">
      {/* Customer Info */}
      <div className="flex flex-col md:flex-row gap-4 p-4 border border-black rounded-lg">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={customer.avatar}
            alt={customer.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1">
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="text-gray-700">{customer.email}</p>
          <p className="text-gray-800">
            Total Orders: {customer.totalOrders} | Total Spend: $
            {customer.totalSpend.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Order History */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Order History</h3>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {customerOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col p-4 border border-black rounded-lg"
            >
              <p className="font-semibold">Order #{order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">Order ID</th>
                <th className="border border-black p-2">Status</th>
                <th className="border border-black p-2">Total</th>
                <th className="border border-black p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border border-black p-2">{order.id}</td>
                  <td className="border border-black p-2">{order.status}</td>
                  <td className="border border-black p-2">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="border border-black p-2">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
