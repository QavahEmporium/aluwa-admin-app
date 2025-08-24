// app/(dashboard)/users/page.tsx
import UsersClient from "@/components/(dashboard)/users/users-list";
import { listUsers } from "@/data/customers";
import { Suspense } from "react";
export const revalidate = 0;

export default async function UsersPage() {
  const users = await listUsers();

  return (
    <Suspense fallback={<>Loading ...</>}>
      <UsersClient users={users} />
    </Suspense>
  );
}
