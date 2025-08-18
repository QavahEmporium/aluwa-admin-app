// app/(dashboard)/users/page.tsx
"use client";

import Image from "next/image";
import { customers } from "@/data/customers"; // your mock data
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const route = useRouter();

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-black rounded px-3 py-2 focus:outline-none"
        />
        <button className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white">
          Search
        </button>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center gap-4 p-4 border border-black rounded-lg bg-white"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={customer.avatar}
                alt={customer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.email}</p>
              <p className="text-sm text-gray-800">
                Orders: {customer.totalOrders} | Spend: $
                {customer.totalSpend.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => route.push(`/users/${customer.id}`)}
              className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left">Avatar</th>
              <th className="border border-black p-2 text-left">Name</th>
              <th className="border border-black p-2 text-left">Email</th>
              <th className="border border-black p-2 text-left">Orders</th>
              <th className="border border-black p-2 text-left">Total Spend</th>
              <th className="border border-black p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="border border-black p-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </td>
                <td className="border border-black p-2">{customer.name}</td>
                <td className="border border-black p-2">{customer.email}</td>
                <td className="border border-black p-2">
                  {customer.totalOrders}
                </td>
                <td className="border border-black p-2">
                  ${customer.totalSpend.toFixed(2)}
                </td>
                <td className="border border-black p-2">
                  <button
                    onClick={() => route.push(`/users/${customer.id}`)}
                    className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
