"use client"

import React, { useEffect, useState } from "react"


import {
  deletePropertyNearByPlace,
  updatePropertyNearByPlace,
} from "@/services/propety"
import { Response } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircledIcon, UpdateIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { GiCancel } from "react-icons/gi"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// Import the generated JSON file
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { NearbyPlaceType } from "@/components/datatable/data/schema"
import Loading from "@/app/loading"

import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader } from "../ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { getAllNearByPlaceType } from "@/services/nearbyPlaceTypes"

const EditPropertyNearByPlace = (basicInfo: any) => {
  const { toast } = useToast()
  const [nearByPlaceData, setNearByPlaceData] = useState<NearbyPlaceType[]>([])
  const FormSchema = z.object({
    nearbyPlaceTypeId: z.number({
      required_error: "Please Select Near By Place.",
    }),
    placeName: z.string({
        required_error: "Please Enter Near By Place Name.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const {
    data: nearByplaceQueryData,
    isSuccess,
    isLoading,
  } = useQuery<NearbyPlaceType[]>({
    queryKey: ["nearbyplace"],
    queryFn: getAllNearByPlaceType,
  })

  useEffect(() => {
    if (isLoading) {
      <Loading />
    }
    if (isSuccess) {
        setNearByPlaceData(nearByplaceQueryData)
    }
  }, [nearByplaceQueryData, isLoading, isSuccess])

  const deleteMutation = useMutation({
    mutationFn: deletePropertyNearByPlace,
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
      }
    },
  })

  const editMutation = useMutation({
    mutationFn: updatePropertyNearByPlace,
    onSuccess: async (data: Response) => {
      if (data.status === 200) {
        toast({
          variant: "default",
          description: "New Amenties Added",
        })
      } else if (data.status === 401) {
        toast({
          variant: "destructive",
          description: "Unauthorized Access",
        })
      } else if (data.status === 400) {
        toast({
          variant: "destructive",
          description: "Please Fill Data Properly",
        })
      } else {
        toast({
          variant: "destructive",
          description: "Something Went Wrong",
        })
      }
    },
  })

  async function onSubmit(data: any) {
    editMutation.mutate({
      propertyId: basicInfo.basicInfoData.id,
      nearbyPlaceTypeId: data.nearbyPlaceTypeId,
      placeName: data.placeName,
    })
  }
  return (
    <div className="flex-col items-center justify-center space-y-3 p-8 md:flex">
      {basicInfo.basicInfoData.nearbyPlaces.length != 0 ? (
        <div className="flex w-full items-center justify-center overflow-hidden flex-wrap gap-x-5 gap-y-3">
          <Card>
            <CardHeader>
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Current Property Near By Places
              </h1>
            </CardHeader>
            <CardContent className="flex w-full items-center justify-center flex-wrap space-x-5 space-y-2 p-4">
              {basicInfo.basicInfoData.nearbyPlaces.map((chip: any) => (
                <Badge
                  variant="secondary"
                  className=" flex flex-col items-center justify-center flex-wrap h-[35px]"
                >
                  <span className="ml-5">Type: {chip.typeName}</span>
                  <span className="ml-5">Place Name: {chip.placeName}</span>
                  {/* <span className="ml-5">Value: {chip.value}</span> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <GiCancel
                          className="h-4 w-4 ml-5 cursor-pointer transition ease duration-300 hover:scale-[1.2]"
                          onClick={(e: any) => {
                            e.preventDefault()
                            console.log(chip)
                            deleteMutation.mutate({
                              propertyId: basicInfo.basicInfoData.id,
                              nearByPlaceId: chip.id,
                            })
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Remove Near By Place</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-between space-y-2 ">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            No Near By Places added for this Property
          </h1>
        </div>
      )}

      <div className="flex flex-col items-center justify-between space-y-2 ">
      <div className="flex items-center justify-between space-y-2 ">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Add New Near By Place
        </h1>
      </div>
      <Form {...form}>
        <form>
          <div className="w-[350px] space-y-5 lg:w-[400px]">
            {/* Property Amnenity */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="nearbyPlaceTypeId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Near By Place Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? nearByPlaceData.find(
                                  (item) => item.id === field.value
                                )?.name
                              : "Select Property Amnenity..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {nearByPlaceData.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id?.toString()}
                                onSelect={() => {
                                  form.setValue("nearbyPlaceTypeId", item.id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === item.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Near By Place Value */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="placeName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Near By Place Name</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Near By Place Name"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[350px] space-y-5 lg:w-[400px]">
              <Button
                disabled={editMutation.isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                {editMutation.isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <PlusCircledIcon className="mr-2" />
                Add Near By Place
              </Button>
            </div>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}

export default EditPropertyNearByPlace
