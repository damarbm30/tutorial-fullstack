"use client";

import { User } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "job",
    header: "Job",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {
      return <span className="flex gap-2"></span>;
    },
  },
];
