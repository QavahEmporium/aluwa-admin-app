export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Welcome, Admin</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-black p-4 rounded">
          <h2 className="font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">124</p>
        </div>
        <div className="border border-black p-4 rounded">
          <h2 className="font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">$12,400</p>
        </div>
        <div className="border border-black p-4 rounded">
          <h2 className="font-semibold">Products</h2>
          <p className="text-2xl font-bold">56</p>
        </div>
        <div className="border border-black p-4 rounded">
          <h2 className="font-semibold">Users</h2>
          <p className="text-2xl font-bold">342</p>
        </div>
      </div>
    </div>
  );
}
