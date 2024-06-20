import { useRouter } from "next/navigation"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"
import { Response, deleteDataFromTable } from "@/types"
import { deleteRecord } from "@/services/areas"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  viewUrl?: string
  editUrl?: string
  hasView?: boolean
  hasEdit?: boolean
  hasDelete?: boolean
  deleteModel?: any
  refetch?: any
}

export function DataTableRowActions<TData>({
  row,
  viewUrl,
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  deleteModel,
  refetch
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: deleteRecord,
    onSuccess: async (data: Response) => {
      if (data.status == 404) {
        toast({
          variant: "destructive",
          description: "Not Found",
        })
      } else if (data.status == 500) {
        toast({
          variant: "destructive",
          description: "Something Went Wrong",
        })
      } else if (data.status == 401) {
        toast({
          variant: "destructive",
          description: "Unauthorized Access",
        })
      } else if (data.status > 410 && data.status < 500) {
        toast({
          variant: "destructive",
          description: data.message,
        })
      } else {
        toast({
          variant: "default",
          description: "Record Deleted",
        })
        refetch()
      }
    },
  })

  const onDelete = (event: React.SyntheticEvent, value: any) => {
    const sendDelete: deleteDataFromTable = {
      id: String(value), modelName: deleteModel,
      arrayList: []
    }
    mutation.mutate(sendDelete)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {hasView && (
          <DropdownMenuItem
            onClick={() => {
              router.push(`${viewUrl}=${row.getValue("id")}`)
            }}
          >
            View
          </DropdownMenuItem>
        )}
        {hasEdit && (
          <DropdownMenuItem
            onClick={() => {
              router.push(`${editUrl}=${row.getValue("id")}`)
            }}
          >
            Edit
          </DropdownMenuItem>
        )}
        {hasDelete && (
          <>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild onSelect={(e) => { e.preventDefault() }}>
                <DropdownMenuItem >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction variant="destructive" onClick={(event: React.SyntheticEvent) => onDelete(event, row.getValue("id"))}>Continue</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
