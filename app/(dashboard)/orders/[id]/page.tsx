// app/admin/orders/[id]/page.tsx
import { getOrderById, listAllOrders } from "@/data/orders";
import { listOrderItems } from "@/data/order-items";
import UpdateOrderStatus from "@/components/(dashboard)/orders/[id]/update-order-status";
import { BackButton } from "@/components/ui/buttons";

export async function generateStaticParams() {
  const orders = await listAllOrders();

  return orders.map((order: any) => ({
    id: order.id,
  }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = (await getOrderById(id)) as any;

  if (!order) {
    return <div>Order not found</div>;
  }

  const items = await listOrderItems(id);

  return (
    <div className="md:p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-3">
        <div className="mb-3">
          <BackButton name="Orders" />
        </div>

        {/* Admin Controls */}
        <UpdateOrderStatus orderId={id} currentStatus={order.status} />
      </div>

      {/* Order Info */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-medium">Order ID</p>
              <p className="text-gray-600">{id}</p>
            </div>
            <div>
              <p className="font-medium">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-medium">User</p>
              <p className="text-gray-600">{order.userId?.name || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Total Amount</p>
              <p className="text-gray-600">R {order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <p className="text-gray-600">{order.shippingAddressId?.address}</p>
        <p className="text-gray-600">
          {order.shippingAddressId?.city}, {order.shippingAddressId?.province}
        </p>
        <p className="text-gray-600">{order.shippingAddressId?.country}</p>
        <p className="text-gray-600">{order.shippingAddressId?.postalCode}</p>
      </div>
      {/* Order Items */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-4 px-3 md:p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Items</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item: any) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-lg p-3 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-700 text-sm">
                  R {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="text-gray-600 text-sm">
                Quantity: {item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
