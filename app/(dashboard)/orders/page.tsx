import { listAllOrders } from "@/data/orders";
import OrdersList from "@/components/(dashboard)/orders/orders-list";

export default async function AdminOrdersPage() {
  const orders = await listAllOrders();

  return <OrdersList orders={orders} />;
}
