"use client"

import { use, useEffect, useState } from "react"
import { getAllAreas, getBrokersByArea } from "@/services/areas"
import { getCategoryWithParams } from "@/services/category"
import { getAllNearByPlaceType } from "@/services/nearbyPlaceTypes"
import { useQuery } from "@tanstack/react-query"
import { set } from "date-fns"
import { Check, ChevronsUpDown } from "lucide-react"
import { GiCancel } from "react-icons/gi"

import { cn } from "@/lib/utils"
import Loading from "@/app/loading"
import { FormItems } from "@/app/properties/addProperty/page"

import {
  Amenity,
  Area,
  Category,
  GetAllArea,
  GetBrokerByAreaSchema,
  NearbyPlaceType,
  PropertyNearbyPlaceType,
} from "../datatable/data/schema"
import { Badge } from "../ui/badge"
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { toast } from "../ui/use-toast"
import FormWrapper from "./FormWrapper"

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void
}

const PropertyAreaAndCategory = ({
  updateForm,
  areaId,
  categoryId,
  nearbyPlaces,
}: stepProps) => {
  const furnishingStatusList = [
    { label: "Unfurnished", value: "Unfurnished" },
    { label: "SemiFurnished", value: "SemiFurnished" },
    { label: "Furnished", value: "Furnished" },
  ] as const

  const readyToMoveInList = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ] as const

  const [openArea, setOpenArea] = useState(false)
  const [areaValue, setAreaValue] = useState<number>(0)
  const [brokerByAreaData, setBrokerByAreaData] = useState<any>()
  const [areaData, setAreaData] = useState<GetAllArea[]>([])
  const [openGetBrokerByArea, setOpenGetBrokerByArea] = useState(false)
  const [getBrokerByAreaValue, setGetBrokerByAreaValue] = useState<number>(0)
  const [getBrokerByAreaData, setGetBrokerByAreaData] = useState<
    GetBrokerByAreaSchema[]
  >([])
  const [categoryData, setcategoryData] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [openNearByPlace, setOpenNearByPlace] = useState(false)
  const [nearByPlaceValue, setNearByPlaceValue] = useState<NearbyPlaceType>({
    id: 0,
    name: "",
  })
  const [nearByPlaceCustomValue, setNearByPlaceCustomValue] = useState("")
  const [nearByPlaceData, setNearByPlaceData] = useState<NearbyPlaceType[]>([])
  const [chips, setChips] = useState<
    { id: number; name: string; value: string }[]
  >([])
  const {
    data: areaQueryData,
    isSuccess,
    isLoading,
  } = useQuery<GetAllArea[]>({ queryKey: ["areas"], queryFn: getAllAreas })
  const {
    data: categoryQueryData,
    isSuccess: categoryIsSuccess,
    isLoading: categoryIsLoading,
  } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: () => getCategoryWithParams("depth=1"),
  })
  const {
    data: nearByplaceQueryData,
    isSuccess: nearByplaceisSuccess,
    isLoading: nearByplaceIsLoading,
  } = useQuery<NearbyPlaceType[]>({
    queryKey: ["nearbyplace"],
    queryFn: getAllNearByPlaceType,
  })
  const {
    data: getBrokerByAreaQueryData,
    isSuccess: getBrokerByAreaisSuccess,
    isLoading: getBrokerByAreaIsLoading,
    refetch: refetchGetBrokerByArea,
  } = useQuery<GetBrokerByAreaSchema[]>({
    queryKey: ["getBrokerByArea"],
    queryFn: () => getBrokersByArea(areaId),
    enabled: areaId!=0 ? true : false,
  })

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
                    updateForm({ categoryId: item.id })
                    setSelectedCategory(item.name)
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
              updateForm({ categoryId: item.id })
              setSelectedCategory(item.name)
            }}
          >
            {item.name}
          </DropdownMenuItem>
        )}
      </>
    )
  }

  useEffect(() => {
    if (
      isLoading &&
      categoryIsLoading &&
      nearByplaceIsLoading
    ) {
      <Loading />
    }
    if (
      isSuccess &&
      categoryIsSuccess &&
      nearByplaceisSuccess
    ) {
      console.log(categoryQueryData)
      setcategoryData(categoryQueryData)
      setAreaData(areaQueryData)
      console.log(areaQueryData)
      setNearByPlaceData(nearByplaceQueryData)
      console.log(nearByplaceQueryData)
      setAreaValue(areaId)
      setSelectedCategory(
        categoryQueryData.find((item: any) => item.id === categoryId)?.name ||
          ""
      )
      setChips(
        nearbyPlaces.map((item: any) => ({
          id: item.nearbyPlaceTypeId,
          name:
            nearByplaceQueryData.find(
              (place: any) => place.id == item.nearbyPlaceTypeId
            )?.name || "",
          value: item.placeName,
        }))
      )
    }
  }, [
    areaQueryData,
    isLoading,
    isSuccess,
    categoryQueryData,
    categoryIsSuccess,
    categoryIsLoading,
    nearByplaceIsLoading,
    nearByplaceisSuccess,
    nearByplaceQueryData,
    nearByplaceIsLoading,
  ])
  useEffect(() => {
    if(getBrokerByAreaIsLoading){
        <Loading />
    }
    if (getBrokerByAreaisSuccess) {
      setGetBrokerByAreaData(getBrokerByAreaQueryData)
    }
  }, [getBrokerByAreaQueryData, getBrokerByAreaisSuccess, getBrokerByAreaIsLoading])

  return (
    <FormWrapper
      title="Enter Property Area And Category"
      description="Please provide all the below information to proceed further"
    >
      <div className="w-[350px] space-y-5 lg:w-[400px]">
        {/* Property Area */}
        <div className="space-y-2  ">
          <Label>Property Area</Label>
          <Popover open={openArea} onOpenChange={setOpenArea}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openArea}
                className="w-full justify-between"
              >
                {areaValue
                  ? areaData.find((item) => item.id === areaValue)?.name
                  : "Select Property Area..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
              </Button>
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
                      onSelect={(currentValue) => {
                        setAreaValue(
                          Number(currentValue) === areaValue ? 0 : item.id
                        )
                        setOpenArea(false)
                        updateForm({ areaId: item.id })
                        setBrokerByAreaData(item.managedByBrokerUsers)
                        setGetBrokerByAreaValue(0)
                        refetchGetBrokerByArea()
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          areaValue === item.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Property Category</Label>
          <DropdownMenu dir="ltr">
            <DropdownMenuTrigger asChild className="w-full">
              <Button variant="outline">
                {selectedCategory != ""
                  ? selectedCategory
                  : "Select Property Category "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]" align="center">
              <DropdownMenuLabel>Property Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryData.map((item) => renderMenuItems(item))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  updateForm({ categoryId: 0 })
                  setSelectedCategory("")
                }}
              >
                UnSelect Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Property Broker */}
        <div className="space-y-2  ">
          <Label>Property Broker</Label>
          <Popover
            open={openGetBrokerByArea}
            onOpenChange={setOpenGetBrokerByArea}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openGetBrokerByArea}
                className="w-full justify-between"
              >
                {getBrokerByAreaValue != 0
                  ? brokerByAreaData.find(
                      (item:any) => item.id === getBrokerByAreaValue
                    )?.fullName
                  : "Select Broker for Property..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search ..." />
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {brokerByAreaData?.map((item:any) => (
                    <CommandItem
                      key={item.id}
                      value={item.id?.toString()}
                      onSelect={(currentValue) => {
                        setGetBrokerByAreaValue(
                          Number(currentValue) === getBrokerByAreaValue
                            ? 0
                            : item.id
                        )
                        setOpenGetBrokerByArea(false)
                        console.log(item.userId)
                        updateForm({ brokerUserId: item.id })
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          getBrokerByAreaValue === item.id
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
        </div>

        {/* Property Near By Place */}
        <div className="space-y-2  ">
          <Label>Property Near By Place</Label>
          <Popover open={openNearByPlace} onOpenChange={setOpenNearByPlace}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openNearByPlace}
                className="w-full justify-between"
              >
                {nearByPlaceValue?.id
                  ? nearByPlaceData.find(
                      (item) => item.id === nearByPlaceValue.id
                    )?.name
                  : "Select Property Near By Place..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
              </Button>
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
                      onSelect={(currentValue) => {
                        setNearByPlaceValue(
                          Number(currentValue) === nearByPlaceValue?.id
                            ? { id: 0, name: "" }
                            : item
                        )
                        setOpenNearByPlace(false)
                        console.log(currentValue)
                        console.log(item)
                        setNearByPlaceCustomValue("")
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          nearByPlaceValue?.id === item.id
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
        </div>

        {/* Near By Place Name */}
        <div className="space-y-2">
          <Label>Near By Place Name</Label>
          <Input
            type="text"
            placeholder="Enter Near By Place Name"
            value={nearByPlaceCustomValue}
            onChange={(e) => {
              setNearByPlaceCustomValue(e.target.value)
            }}
          />
          <Button
            onClick={(e: any) => {
              e.preventDefault()
              console.log(nearByPlaceValue.id + "nearByPlaceValue")
              if (nearByPlaceValue.id == 0) {
                toast({
                  variant: "destructive",
                  description: "Please select an Amenity",
                })
              } else {
                setChips([
                  ...chips,
                  {
                    id: nearByPlaceValue.id,
                    name: nearByPlaceValue.name,
                    value: nearByPlaceCustomValue,
                  },
                ])
                updateForm({
                  nearbyPlaces: [
                    ...nearbyPlaces,
                    {
                      nearbyPlaceTypeId: nearByPlaceValue.id,
                      placeName: nearByPlaceCustomValue,
                    },
                  ],
                })
                setNearByPlaceCustomValue("")
              }
            }}
          >
            Add
          </Button>
        </div>
        {/* Chips  */}
        <div className="flex w-full items-center justify-center overflow-hidden flex-wrap gap-x-5 gap-y-3">
          {chips.map((chip) => (
            <Badge
              variant="secondary"
              className=" flex flex-col items-center justify-center flex-wrap h-[35px]"
            >
              {chip.name}
              {chip.value !== "" ? (
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
                        updateForm({
                          nearbyPlaces: nearbyPlaces.filter(
                            (item: any) => item.nearbyPlaceTypeId !== chip.id
                          ),
                        })
                        const a = [...chips]
                        a.splice(chips.indexOf(chip), 1)
                        setChips(a)
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
        </div>
      </div>
    </FormWrapper>
  )
}

export default PropertyAreaAndCategory
