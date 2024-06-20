import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { priorities, statuses } from "./data/data"
import { GetPropertyCategorySchema } from "./data/schema"

interface PropertyColumnsProps {
  viewUrl?: string
  editUrl?: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
}
export const columns = ({
  viewUrl,
  editUrl,
  hasView,
  hasDelete,
  hasEdit,
}: PropertyColumnsProps): ColumnDef<GetPropertyCategorySchema>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Name" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IsFeatured" />
    ),
  },
  {
    accessorKey: "availableFor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AvailableFor" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        viewUrl={viewUrl}
        editUrl={editUrl}
        hasView={hasView}
        hasEdit={hasEdit}
        deleteModel={"property"}
        hasDelete={hasDelete}
      />
    ),
  },
]
