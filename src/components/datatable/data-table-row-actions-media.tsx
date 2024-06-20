import { useRouter } from "next/navigation"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"
import { Response } from "@/types"
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
import { deletePropertyMedia } from "@/services/propety"

interface PropertyMediaDataTableRowActionsProps<TData> {
  row: Row<TData>
  viewUrl?: string
  editUrl?: string
  hasView?: boolean
  hasEdit?: boolean
  hasDelete?: boolean
  propertyID: number
  refetch?: any
}

export function MediaDataTableRowActions<TData>({
  row,
  editUrl,
  hasView,
  hasEdit,
  hasDelete,
  propertyID,
  refetch
}: PropertyMediaDataTableRowActionsProps<TData>) {
  const router = useRouter()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: deletePropertyMedia,
    onSuccess: async (data: Response) => {
      if (data.status == 200) {
        toast({
          variant: "default",
          description: "Record Deleted",
        })
      }else if (data.status == 404) {
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
          variant: "destructive",
          description: "Something Went Wrong",
        })
      }
      refetch()
    },
  })

  const onDelete = (event: React.SyntheticEvent, value: any) => {
    const reqData = {
      propertyId: propertyID,
      mediaId: value
    }
    mutation.mutate(reqData)
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
              window.open(`https://localhost:5000/uploads/property-media/${row.getValue("fileName")}`)
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
