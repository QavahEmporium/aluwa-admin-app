import { listAllOrders } from "@/data/orders";
import OrdersList from "@/components/(dashboard)/orders/orders-list";
import { Suspense } from "react";
export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await listAllOrders();

  return (
    <Suspense fallback={<>Loading ...</>}>
      <OrdersList orders={orders} />
    </Suspense>
  );
}
