"use client";

import { useState, useMemo } from "react";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
};

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "John Doe", date: "2025-08-12", total: 120.0, status: "Pending" },
  { id: "ORD-002", customer: "Jane Smith", date: "2025-08-13", total: 85.5, status: "Shipped" },
  { id: "ORD-003", customer: "Michael Scott", date: "2025-08-13", total: 200.99, status: "Delivered" },
  { id: "ORD-004", customer: "Pam Beesly", date: "2025-08-14", total: 45.75, status: "Pending" },
  { id: "ORD-005", customer: "Dwight Schrute", date: "2025-08-15", total: 150.0, status: "Shipped" },
  { id: "ORD-006", customer: "Jim Halpert", date: "2025-08-15", total: 99.99, status: "Delivered" },
];

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Order["status"]>("All");
  const [sortKey, setSortKey] = useState<keyof Order>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const itemsPerPage = 4;

  const filteredOrders = useMemo(() => {
    return orders
      .filter(
        (order) =>
          (statusFilter === "All" || order.status === statusFilter) &&
          (order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        let compare = 0;
        if (a[sortKey] < b[sortKey]) compare = -1;
        if (a[sortKey] > b[sortKey]) compare = 1;
        return sortAsc ? compare : -compare;
      });
  }, [orders, search, statusFilter, sortKey, sortAsc]);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, page]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleSort = (key: keyof Order) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-black px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
            setPage(1);
          }}
          className="border border-black px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="border border-black p-4 rounded">
            <div className="flex justify-between font-semibold">
              <span>{order.id}</span>
              <span>{order.status}</span>
            </div>
            <div className="text-sm mt-1">{order.customer}</div>
            <div className="text-sm">{order.date}</div>
            <div className="font-bold mt-2">${order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="border border-black px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("id")}
              >
                Order ID {sortKey === "id" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="border border-black px-4 py-2 text-left">Customer</th>
              <th
                className="border border-black px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date {sortKey === "date" && (sortAsc ? "↑" : "↓")}
              </th>
              <th
                className="border border-black px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("total")}
              >
                Total {sortKey === "total" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="border border-black px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td className="border border-black px-4 py-2">{order.id}</td>
                <td className="border border-black px-4 py-2">{order.customer}</td>
                <td className="border border-black px-4 py-2">{order.date}</td>
                <td className="border border-black px-4 py-2">${order.total.toFixed(2)}</td>
                <td className="border border-black px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border border-black rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border border-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
