import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Amenity } from "./data/schema"

interface BrokerColumnsProps {
  viewUrl?: string
  editUrl?: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
  refetchData: any
}

export const amenityColumns = ({
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  refetchData,
}: BrokerColumnsProps): ColumnDef<Amenity>[] => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amenity ID" />
      ),
      cell: ({ row }) => <div className="ml-5">{row.getValue("id")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "iconName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon" />
      ),
      cell: ({ row }) => (
        <img
          src={`/amenityIcons/${row.getValue("iconName")}`}
          width={30}
          height={30}
          alt={`${row.getValue("iconFileName")}`}
          className="dark:bg-white rouneded-md"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amenity" />
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
          deleteModel="amenity"
          refetch={refetchData}
        />
      ),
    },
  ]
