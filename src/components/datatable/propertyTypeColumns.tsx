import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { PropertyCategory } from "./data/schema"

interface ColumnsProps {
  viewUrl?: string
  editUrl?: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
  refetchData: any
}
export const propertyTypeColumns = ({
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  refetchData
}: ColumnsProps): ColumnDef<PropertyCategory>[] => [
  
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Property Type ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Property Type Name" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          editUrl={editUrl}
          hasView={hasView}
          hasEdit={hasEdit}
          hasDelete={hasDelete}
          refetch={refetchData}
          deleteModel={"category"}
        />
      ),
    },
  ]
