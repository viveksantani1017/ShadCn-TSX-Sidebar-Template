import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { MediaDataTableRowActions } from "./data-table-row-actions-media"
import { PropertyMedia } from "./data/schema"

interface PropertyMediaColumnsProps {
  viewUrl?: string
  editUrl?: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
  propertyID: number 
  refetchData: any
}
export const editPropertyMediaColumn = ({
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  propertyID,
  refetchData,
}: PropertyMediaColumnsProps): ColumnDef<PropertyMedia>[] => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Media ID"/>
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "fileName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File" />
      ),
      cell: ({ row }) => (
        <img
          src={`https://localhost:5000/uploads/property-media/${row.getValue("fileName")}`}
          width={30}
          height={30}
          alt={`${row.getValue("fileName")}`}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "fileName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Name" />
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Media Type" />
      ),
    },

    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <MediaDataTableRowActions
          row={row}
          editUrl={editUrl}
          hasView={hasView}
          hasEdit={hasEdit}
          hasDelete={hasDelete}
          propertyID={propertyID}
          refetch={refetchData}
        />
      ),
    },
  ]
