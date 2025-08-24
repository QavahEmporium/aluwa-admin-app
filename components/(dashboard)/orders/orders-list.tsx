"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Pagination from "@/components/ui/pagination";

export default function OrdersListPage({ orders }: { orders: any[] }) {
  const [allOrders, setAllOrders] = useState<any[]>(orders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return allOrders.filter(
      (order) =>
        (status === "All" || order.status === status) &&
        (order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.id.toLowerCase().includes(search.toLowerCase()))
    );
  }, [allOrders, search, status]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage]);

  return (
    <div className="p-0 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Orders</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset on search
          }}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1); // reset on filter
          }}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Mobile pagination */}
      <div className="md:hidden mb-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile list */}
      <div className="space-y-4 md:hidden">
        {paginatedOrders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block border border-gray-200 shadow-sm p-4 rounded-xl bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="flex flex-row justify-between font-semibold text-sm">
                  <p>Order #{order.id}</p> <ChevronRight />
                </div>
                <div className="text-sm text-gray-600">{order.date}</div>
                <div className="font-bold mt-1">R {order.total.toFixed(2)}</div>
                <span
                  className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "paid"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono">{order.id}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">R {order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "paid"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "shipped"
                        ? "bg-purple-100 text-purple-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <div className="inline-flex gap-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-3 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-100"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desktop pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
