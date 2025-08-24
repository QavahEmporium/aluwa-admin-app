// app/(dashboard)/users/UsersClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
};

export default function UsersClient({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Customers</h1>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filteredUsers.map((user) => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-300">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-800 mt-1">
                  Orders: {user.totalOrders} | Spend: R
                  {user.totalSpend.toFixed(2)}
                </p>
              </div>{" "}
            </div>

            <ChevronRight />
          </Link>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Orders</th>
              <th className="p-3 text-right">Total Spend</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-300">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">{user.totalOrders}</td>
                <td className="p-3 text-right">
                  R {user.totalSpend.toFixed(2)}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
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
