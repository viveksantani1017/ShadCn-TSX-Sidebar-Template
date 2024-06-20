"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  addAmenties,
  getAllAmenities,
  getAmenityById,
  updateAmenity,
} from "@/services/amenties"
import {
  deletePropertyAmenity,
  updatePropertyAmenity,
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
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/components/ui/use-toast"
import { Amenity } from "@/components/datatable/data/schema"
import imageList from "@/components/imageList.json"
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

const EditPropertyAmenities = (basicInfo: any) => {
  const { toast } = useToast()
  const [amenityData, setAmenityData] = useState<Amenity[]>([])
  const FormSchema = z.object({
    amenityId: z.number({
      required_error: "Please Select Amenity.",
    }),
    value: z.string().optional(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const {
    data: amenityQueryData,
    isSuccess,
    isLoading,
  } = useQuery<Amenity[]>({ queryKey: ["amenities"], queryFn: getAllAmenities })

  useEffect(() => {
    if (isLoading) {
      ;<Loading />
    }
    if (isSuccess) {
      setAmenityData(amenityQueryData)
    }
  }, [amenityQueryData, isLoading, isSuccess])

  const deleteMutation = useMutation({
    mutationFn: deletePropertyAmenity,
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
    mutationFn: updatePropertyAmenity,
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
      amenityId: data.amenityId,
      value: data.value,
    })
  }
  return (
    <div className="flex-col items-center justify-center space-y-3 p-8 md:flex">
      {basicInfo.basicInfoData.amenities.length != 0 ? (
        <div className="flex w-full items-center justify-center overflow-hidden flex-wrap gap-x-5 gap-y-3">
          <Card>
            <CardHeader>
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Current Property Amenities
              </h1>
            </CardHeader>
            <CardContent className="flex w-full items-center justify-center flex-wrap space-x-5 space-y-2 p-4">
              {basicInfo.basicInfoData.amenities.map((chip: any) => (
                <Badge
                  variant="secondary"
                  className=" flex flex-col items-center justify-center flex-wrap h-[35px]"
                >
                  {chip.name}
                  <img
                    src={`/amenityIcons/${chip.iconName}`}
                    alt="icon"
                    className="ml-5 h- w-5"
                  />
                  {chip.value != null ? (
                    <span className="ml-5">Value: {chip.value}</span>
                  ) : null}
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
                              amenityId: chip.id,
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
            No Amenities added for this Property
          </h1>
        </div>
      )}

      <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center justify-center space-y-2">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Add New Amenities
        </h1>
      </div>
      <Form {...form}>
        <form>
          <div className="w-[350px] space-y-5 lg:w-[400px]">
            {/* Property Amnenity */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="amenityId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Amnenity</FormLabel>
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
                              ? amenityData.find(
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
                            {amenityData.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id?.toString()}
                                onSelect={() => {
                                  form.setValue("amenityId", item.id)
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

            {/* Amenity Value */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Amenity Value</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Amenity Value"
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
                Add Amenity
              </Button>
            </div>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}

export default EditPropertyAmenities
