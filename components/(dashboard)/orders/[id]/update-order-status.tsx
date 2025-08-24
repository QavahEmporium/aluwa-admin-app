"use client";
import { updateOrderStatusAction } from "@/actions/order";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateStatus = async (status: string) => {
    startTransition(async () => {
      await updateOrderStatusAction(orderId, status);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {currentStatus !== "shipped" && (
        <button
          onClick={() => updateStatus("shipped")}
          disabled={isPending}
          className="p-2 w-[161px] flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Mark as Shipped"
          )}
        </button>
      )}
      {currentStatus !== "delivered" && (
        <button
          onClick={() => updateStatus("delivered")}
          disabled={isPending}
          className="p-2 w-[161px] flex items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Mark as Delivered"
          )}
        </button>
      )}
      {currentStatus !== "cancelled" && (
        <button
          onClick={() => updateStatus("cancelled")}
          disabled={isPending}
          className="p-2 w-[127px] flex items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : "Cancel Order"}
        </button>
      )}
      {/* <Link
        href="/orders"
        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Back to Orders
      </Link> */}
    </div>
  );
}
