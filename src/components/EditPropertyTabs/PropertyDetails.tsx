"use client"

import { useEffect, useState } from "react"
import { getAllAreas } from "@/services/areas"
import { getCategoryWithParams } from "@/services/category"
import { updatePropertyBasicInfo, updatePropertyDetails } from "@/services/propety"
import { Response } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown, Wind } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import Loading from "@/app/loading"

import { GetAllArea } from "../datatable/data/schema"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Icons } from "../ui/icons"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { toast } from "../ui/use-toast"

const PropertyDetails = (basicInfo: any) => {
  
    const furnishingStatusList = [
        { label: "Unfurnished", value: "Unfurnished" },
        { label: "SemiFurnished", value: "SemiFurnished" },
        { label: "Furnished", value: "Furnished" }
    ] as const

    const readyToMoveInList = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ] as const

  const FormSchema = z.object({
    projectName: z.string({
      required_error: "Please enter Project Name.",
    }),
    bhk: z.number({
      required_error: "Please enter Property BHK.",
    }),
    carpetArea: z.string({
      required_error: "Please enter Project Carpet Area.",
    }),
    superBuiltUpArea: z.string({
      required_error: "Please enter Project Super Built Up Area.",
    }),
    ageInYears: z.number({
      required_error: "Please enter Project Age In Years.",
    }),
    furnishingStatus: z.string({
      required_error: "Please select Property Furnishing Status.",
    }),
    readyToMoveIn: z.boolean({
      required_error: "Please select Property Is Ready To Move In.",
    }),
    maintenancePricePerMonth: z.number({
      required_error: "Please enter Maintainance Price Per Month    .",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    form.setValue("projectName", basicInfo.basicInfoData.details.projectName)
    form.setValue("bhk", basicInfo.basicInfoData.details.bhk)
    form.setValue("carpetArea", basicInfo.basicInfoData.details.carpetArea)
    // setSelectedCategory(basicInfo.basicInfoData.category?.name)
    form.setValue(
      "superBuiltUpArea",
      basicInfo.basicInfoData.details.superBuiltUpArea
    )
    form.setValue("ageInYears", basicInfo.basicInfoData.details.ageInYears)
    form.setValue(
      "furnishingStatus",
      basicInfo.basicInfoData.details.furnishingStatus
    )
    form.setValue(
      "readyToMoveIn",
      basicInfo.basicInfoData.details.readyToMoveIn
    )
    form.setValue(
      "maintenancePricePerMonth",
      basicInfo.basicInfoData.details.maintenancePricePerMonth
    )
  }, [basicInfo])

  const editMutation = useMutation({
    mutationFn: updatePropertyDetails,
    onSuccess: async (data: Response) => {
      if (data.status === 200) {
        toast({
          variant: "default",
          description: "Property Details Updated Successfully",
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
      id: basicInfo.basicInfoData.id,
      details: data,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2 ">
        {/* <h1 className="text-center text-2xl font-semibold tracking-tight">
          Add New Amenity
        </h1> */}
      </div>
      <Form {...form}>
        <form>
          <div className="w-[350px] space-y-5 lg:w-[400px]">
            {/* Property Project Name */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Project Name</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Property Project Name"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property BHK */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="bhk"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property BHK</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Property BHK"
                          onChange={(e)=>{
                            form.setValue("bhk", Number(e.target.value))
                          }}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Carpet Area */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="carpetArea"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Carpet Area</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Property Carpet Area"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Super BuildUp Area */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="superBuiltUpArea"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Super BuildUp Area</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Property Super BuildUp Area"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Age In Years */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="ageInYears"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Age In Years</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Property Age In Years"
                          onChange={(e)=>{
                            form.setValue("ageInYears", Number(e.target.value))
                          }}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Furnishing Status */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="furnishingStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Furnishing Status</FormLabel>
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
                      ? furnishingStatusList.find(
                          (item) => item.value === field.value
                        )?.label
                      : "Select Furnishing Status..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                      {furnishingStatusList.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={( ()=> {
                            form.setValue("furnishingStatus", item.value)
                            
                          })}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === item.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.label}
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
            
            {/* Property Ready To Move In */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="readyToMoveIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Ready To Move In</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !(field.value ? "yes" : "no") && "text-muted-foreground"
                            )}
                          >
                    {(field.value ? "yes" : "no")
                      ? readyToMoveInList.find(
                          (item) => item.value === (field.value ? "yes" : "no")
                        )?.label
                      : "Select Ready To Move In..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                      {readyToMoveInList.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={() => {
                            form.setValue("readyToMoveIn", (item.value === "yes" ? true : false))
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              (field.value ? "yes" : "no") === item.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.label}
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

            {/* Property Maintainance Price Per Month */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="maintenancePricePerMonth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Maintainance Price Per Month</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Property Maintainance Price Per Month"
                          onChange={(e)=>{
                            form.setValue("maintenancePricePerMonth", Number(e.target.value))
                          }}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Submit Button */}
            <Button
              disabled={editMutation.isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {editMutation.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <UpdateIcon className="mr-2" />
              Update Property Details
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PropertyDetails
