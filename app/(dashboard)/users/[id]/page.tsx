// app/(dashboard)/users/[id]/page.tsx
import { getUserWithOrders, listUsers } from "@/data/customers";
import UserDetailClient from "@/components/(dashboard)/users/[id]/user-details";

export async function generateStaticParams() {
  const users = await listUsers();

  return users.map((user: any) => ({
    id: user.id,
  }));
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserWithOrders(id);

  if (!user) {
    return <div className="p-6">User not found.</div>;
  }

  return (
    <div className="md:p-4 md:p-6 max-w-5xl mx-auto">
      <UserDetailClient user={user} />
    </div>
  );
}
