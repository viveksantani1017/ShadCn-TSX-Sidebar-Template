import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Broker } from "./data/schema"

interface BrokerColumnsProps {
  viewUrl?: string
  editUrl?: string
  hasView: boolean
  hasEdit: boolean
  hasDelete: boolean
  refetchData: any
}
export const brokerColumns = ({
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  refetchData
}: BrokerColumnsProps): ColumnDef<Broker>[] => [
    {
      accessorKey: "userId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Broker ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("userId")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Broker" />
      ),
    },
    // {
    //   accessorKey: "phone",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Phone Number" />
    //   ),
    // },
    // {
    //   accessorKey: "email",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Email" />
    //   ),
    // },
    // {
    //   id: "actions",
    //   cell: ({ row }) => (
    //     <DataTableRowActions
    //       row={row}
    //       editUrl={editUrl}
    //       hasView={hasView}
    //       hasEdit={hasEdit}
    //       deleteModel={"broker"}
    //       hasDelete={hasDelete}
    //     />
    //   ),
    // },
  ]
