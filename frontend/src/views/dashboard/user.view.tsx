import { useState } from "react";
import { DataTable } from "../../components";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserView() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: "2024-02-10",
    },
  ]);

  return (
    <DataTable<User>
      title="Users"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "createdAt", label: "Created At" },
      ]}
      data={users}
      onAdd={() => console.log("Add user")}
      onEdit={(user) => console.log("Edit user:", user)}
      onDelete={(user) => console.log("Delete user:", user)}
      addButtonText="Add User"
      addButtonVariant="primary"
    />
  );
}
