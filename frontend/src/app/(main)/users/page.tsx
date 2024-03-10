import Container from "@/components/layout/container";
import { usersColumns } from "@/components/users/users-columns";
import { UsersTable } from "@/components/users/users-table";
import { getAllUsers } from "@/services/users.service";

export default async function Users() {
  const { data, status } = await getAllUsers();

  return (
    <Container>
      <UsersTable columns={usersColumns} data={data} />
    </Container>
  );
}
