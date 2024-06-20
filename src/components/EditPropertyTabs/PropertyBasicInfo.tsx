"use client"

import { useEffect, useState } from "react"
import { getAllAreas } from "@/services/areas"
import { getCategoryWithParams } from "@/services/category"
import { updatePropertyBasicInfo } from "@/services/propety"
import { Response } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { add } from "date-fns"
import { Check, ChevronsUpDown, Wind } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import Loading from "@/app/loading"
import { FormItems } from "@/app/properties/addProperty/page"

import { Category, GetAllArea } from "../datatable/data/schema"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
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
import { Textarea } from "../ui/textarea"
import { toast } from "../ui/use-toast"

const PropertyBasicInfo = (basicInfo: any) => {
  const availableForList = [
    { label: "Purchase", value: "Purchase" },
    { label: "Rent", value: "Rent" },
    { label: "Both", value: "Both" },
  ] as const

  const propertyStatusList = [
    { label: "Available", value: "Available" },
    { label: "Purchased", value: "Purchased" },
    { label: "Rented", value: "Rented" },
  ] as const

  const isFeaturedList = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ] as const

  const [categoryData, setcategoryData] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [brokerByAreaData, setBrokerByAreaData] = useState<any>()
  const [areaData, setAreaData] = useState<GetAllArea[]>([])

  const {
    data: categoryQueryData,
    isSuccess: categoryIsSuccess,
    isLoading: categoryIsLoading,
  } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: () => getCategoryWithParams("depth=3"),
  })

  const {
    data: areaQueryData,
    isSuccess,
    isLoading,
  } = useQuery<GetAllArea[]>({ queryKey: ["areas"], queryFn: getAllAreas })

  const FormSchema = z.object({
    name: z.string({
      required_error: "Please enter Property name.",
    }),
    address: z.string({
      required_error: "Please enter Property address.",
    }),
    isFeatured: z.boolean({
      required_error: "Please select if property is featured.",
    }),
    availableFor: z.string({
      required_error: "Please select property availability.",
    }),
    status: z.string({
      required_error: "Please select property status.",
    }),
    categoryId: z.number({
      required_error: "Please select property category.",
    }),
    areaId: z.number({
      required_error: "Please select property area.",
    }),
    brokerUserId: z.number({
      required_error: "Please select broker.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    if (isLoading && categoryIsLoading) {
      ;<Loading />
    }
    if (isSuccess && categoryIsSuccess) {
      setcategoryData(categoryQueryData)
      setAreaData(areaQueryData)
      console.log(
        areaQueryData?.find(
          (item) => item.id == basicInfo.basicInfoData.area?.id
        )?.managedByBrokerUsers
      )
      setBrokerByAreaData(
        areaQueryData?.find(
          (item) => item.id == basicInfo.basicInfoData.area?.id
        )?.managedByBrokerUsers
      )
    }
  }, [
    categoryQueryData,
    categoryIsSuccess,
    categoryIsLoading,
    areaQueryData,
    isSuccess,
    isLoading,
    basicInfo
  ])

  useEffect(() => {
    form.setValue("name", basicInfo.basicInfoData.name)
    form.setValue("address", basicInfo.basicInfoData.address)
    form.setValue("isFeatured", basicInfo.basicInfoData.isFeatured)
    setSelectedCategory(basicInfo.basicInfoData.category?.name)
    form.setValue("availableFor", basicInfo.basicInfoData.availableFor)
    form.setValue("status", basicInfo.basicInfoData.status)
    form.setValue("categoryId", basicInfo.basicInfoData.category?.id)
    form.setValue("areaId", basicInfo.basicInfoData.area?.id)
    form.setValue("brokerUserId", basicInfo.basicInfoData.brokerUser?.id)
  }, [basicInfo])

  const editMutation = useMutation({
    mutationFn: updatePropertyBasicInfo,
    onSuccess: async (data: Response) => {
      if (data.status === 200) {
        toast({
          variant: "default",
          description: "Property Basic Info Data Updated",
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
    if (form.getValues().categoryId == 0) {
      form.setError("categoryId", {
        message: "Please select a category",
      })
      return
    }
    console.log(data)
    editMutation.mutate({
      id: basicInfo.basicInfoData.id,
      details: data,
    })
  }
  const renderMenuItems = (item: any) => {
    return (
      <>
        {item.hasChildren ? (
          <DropdownMenuSub key={item.id}>
            <DropdownMenuSubTrigger>{item.name}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  key={`first-${item.id}`}
                  onClick={() => {
                    setSelectedCategory(item.name)
                    form.setValue("categoryId", item.id)
                  }}
                >
                  {item.name}
                </DropdownMenuItem>
                {item?.children?.map((child: any) => renderMenuItems(child))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem
            key={item.id}
            onClick={() => {
              form.setValue("categoryId", item.id)
              setSelectedCategory(item.name)
            }}
          >
            {item.name}
          </DropdownMenuItem>
        )}
      </>
    )
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
            {/* Property Name */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter Property Name"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Address */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <>
                        <Textarea
                          {...field}
                          placeholder="Enter Property Address"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mark As Featured */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Mark as Featured</FormLabel>
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
                              ? isFeaturedList.find(
                                  (item) =>
                                    item.value == (field.value ? "yes" : "no")
                                )?.label
                              : "Select If Featured..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {isFeaturedList.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  form.setValue(
                                    "isFeatured",
                                    item.value == "yes" ? true : false
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value == (field.value ? "yes" : "no")
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

            {/* Property Available For */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="availableFor"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Available For</FormLabel>
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
                              ? availableForList.find(
                                  (item) => item.value === field.value
                                )?.label
                              : "Select Available For..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {availableForList.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  form.setValue("availableFor", item.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
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

            {/* Property Status */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Status</FormLabel>
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
                              ? propertyStatusList.find(
                                  (item) => item.value == field.value
                                )?.label
                              : "Select Property Status..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {propertyStatusList.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  form.setValue("status", item.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value == field.value
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

            {/* Category */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Category</FormLabel>
                    <FormControl>
                      <DropdownMenu dir="ltr">
                        <DropdownMenuTrigger asChild className="w-full">
                          <Button variant="outline">
                            {selectedCategory != ""
                              ? selectedCategory
                              : "Select Property Category "}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-[300px]"
                          align="center"
                        >
                          <DropdownMenuLabel>
                            Property Categories
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {categoryData.map((item) => renderMenuItems(item))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              // updateForm({ categoryId: 0 })
                              setSelectedCategory("")
                              form.setValue("categoryId", 0)
                            }}
                          >
                            UnSelect Category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Property Area */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="areaId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Area</FormLabel>
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
                              ? areaData.find((item) => item.id === field.value)
                                  ?.name
                              : "Select Property Area..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {areaData.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id?.toString()}
                                onSelect={() => {
                                  form.setValue("areaId", item.id)
                                  setBrokerByAreaData(item.managedByBrokerUsers)
                                  form.setValue("brokerUserId", 0)
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

            {/* Property Broker */}
            <div className="space-y-2  ">
              <FormField
                control={form.control}
                name="brokerUserId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Property Broker</FormLabel>
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
                            {field.value != 0
                              ? brokerByAreaData?.find(
                                  (item: any) => item.id === field.value
                                )?.fullName
                              : "Select Broker for Property..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search ..." />
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {brokerByAreaData?.map((item: any) => (
                              <CommandItem
                                key={item.id}
                                value={item.id?.toString()}
                                onSelect={() => {
                                  form.setValue("brokerUserId", item.id)
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
                                {item.fullName}
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

            {/* Submit Button */}
            <Button
              disabled={editMutation.isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {editMutation.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <UpdateIcon className="mr-2" />
              Update Property Info
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PropertyBasicInfo
