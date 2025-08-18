// components/ui/customer-card.tsx
import Image from "next/image";

export function CustomerCard({ customer }: any) {
  return (
    <div className="flex items-center gap-4 p-4 border border-black rounded-lg w-full bg-white">
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
      <button className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white">
        View
      </button>
    </div>
  );
}
