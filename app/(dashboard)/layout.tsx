"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Package,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  List,
  User,
  Settings,
} from "lucide-react";
import UserDropdown from "@/components/(dashboard)/user-dropdown";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", href: "/home", icon: LayoutDashboard },
    { label: "Orders", href: "/orders", icon: ShoppingCart },
    { label: "Products", href: "/products", icon: Package },
    { label: "Categories", href: "/categories", icon: List },
    { label: "Users", href: "/users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ✅ Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl h-full p-4 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl text-turquoise-700">Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {menuItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-turquoise-100 text-turquoise-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button className="flex items-center gap-2 px-3 py-2 mt-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 shadow-sm p-4">
        <h1 className="font-bold text-xl text-turquoise-700 mb-6">Admin</h1>
        <nav className="flex-1 space-y-1">
          {menuItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-turquoise-100 text-turquoise-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button className="flex items-center gap-2 px-3 py-2 mt-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h2 className="font-semibold text-lg text-gray-800">Dashboard</h2>
          </div>

          {/* ✅ User Profile Dropdown */}
          <UserDropdown />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
