import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { PropertyMedia } from "../datatable/data/schema";
import { useRouter } from "next/navigation"
import { addPropertyMedia, getPropertyById } from "@/services/propety"
import { Response } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GiCancel } from "react-icons/gi"
import { DataTable } from "../datatable/DataTable"
import { editPropertyMediaColumn } from "../datatable/EditPropertyMediaColumn"
import { GetPropertyCategorySchema } from "../datatable/data/schema"
import Loading from "@/app/loading"

const PropertyMedia = (basicInfo: any) => {
  const router = useRouter()
  const { toast } = useToast()

  const fileInput = useRef<HTMLInputElement | null>(null)
  const [propertyMediaByID, setPropertyMediaByID] = useState<PropertyMedia[]>([])


  const { data, isSuccess, isLoading,refetch } = useQuery<GetPropertyCategorySchema>({
    queryKey: ["propertyById"],
    queryFn: () => getPropertyById(Number(basicInfo.basicInfoData.id))
  })

  useEffect(() => {
      if (isLoading) <Loading />

      if (isSuccess) {
        setPropertyMediaByID(data.media)
      }
    
  }, [isLoading, isSuccess, data])

  const mutation = useMutation({
    mutationFn: addPropertyMedia,
    onSuccess: async (data: Response) => {
      if (data.status === 200) {
        toast({
          variant: "default",
          description: "Property Media Added",
        })
        router.push("/properties")
      } else if (data.status === 401) {
        toast({
          variant: "destructive",
          description: "Unauthorized Access",
        })
      } else {
        toast({
          variant: "destructive",
          description: "Something Went Wrong",
        })
      }
    },
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData()

    if (fileInput.current?.files) {
      Array.from(fileInput.current.files).forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })
    }
    const reqData = {
      data: formData,
      propertyID: basicInfo.basicInfoData.id
    }
    mutation.mutate(reqData)
  }

  const viewUrl = "/properties/propertyDetails?property"
  const editUrl = "/properties/editProperty?property"
  const hasView = true
  const hasEdit = true
  const hasDelete = true
  const propertyID = basicInfo.basicInfoData.id
  console.log(basicInfo.basicInfoData.media)

  return (
    <div className="flex-col items-center justify-center space-y-3 p-8 md:flex">
      <Tabs defaultValue="viewCurrentMedia" className="flex flex-col lg:flex-col space-y-4">
        <TabsList className="lg:flex lg:flex-row flex-wrap lg:justify-between lg:justify-center lg:space-x-10 padding-2 w-[100%] h-fit">
          <div className="flex justify-center items-center p-2">
            <TabsTrigger value="viewCurrentMedia" className="border-2 border-black-500 text-wrap ">
              View Current Media
            </TabsTrigger>
          </div>
          <div className="flex justify-center items-center p-2">
            <TabsTrigger value="addNewPropertyMedia" className="border-2 border-black-500 text-wrap ">
              Add New Property Media
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="viewCurrentMedia" className="mt-10 space-y-4">
        <DataTable data={propertyMediaByID} columns={editPropertyMediaColumn({ viewUrl, editUrl, hasView, hasEdit, hasDelete,propertyID,refetchData:refetch})} searchColumn="fileName"/>
        </TabsContent>
        <TabsContent value="addNewPropertyMedia" className="space-y-4 w-full ">
          <div className="w-full h-full flex flex-col justify-center items-center p-8">
            <div className="flex items-center justify-between space-y-2">
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Add Property Media
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="w-[350px] space-y-5 lg:w-[400px]">
                <div className="space-y-2">
                  <Label>Files</Label>
                  <Input
                    type="file"
                    ref={fileInput}
                    multiple
                    placeholder="Select Files"
                    disabled={mutation.isPending}
                  />
                </div>

                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Property Media
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyMedia