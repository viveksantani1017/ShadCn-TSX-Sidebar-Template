import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Area } from "./data/schema"

interface AreaColumnsProps {
  viewUrl?: string
  editUrl: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
  refetchData: any
}
export const areaColumns = ({
  viewUrl,
  editUrl,
  hasView,
  hasDelete,
  hasEdit,
  refetchData
}: AreaColumnsProps): ColumnDef<Area>[] => [
  
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Area ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Area Name" />
      ),
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
    },

    {
      accessorKey: "pincode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pincode" />
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
          hasDelete={hasDelete}
          deleteModel={"area"}
          refetch={refetchData}
        />
      ),
    },
  ]
