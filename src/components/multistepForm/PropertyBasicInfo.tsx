"use client"

import { useEffect, useState } from "react"

import { FormItems } from "@/app/properties/addProperty/page"
import FormWrapper from "./FormWrapper"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Label } from "../ui/label"
import { Check, ChevronsUpDown } from "lucide-react"

type stepProps = FormItems & {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void
}



const PropertyBasicInfo = ({
    updateForm,
    name,
    address,
    isFeatured,
    availableFor,
    status

}: stepProps) => {



    const availableForList = [
        { label: "Purchase", value: "Purchase" },
        { label: "Rent", value: "Rent" },
        { label: "Both", value: "Both" }
    ] as const

    const propertyStatusList = [
        { label: "Available", value: "Available" },
        { label: "Purchased", value: "Purchased" },
        { label: "Rented", value: "Rented" }
    ] as const

    const isFeaturedList = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ] as const

    const [openIsFeatured, setOpenIsFeatured] = useState(false)
    const [isFeaturedvalue, setIsFeaturedValue] = useState("")
    const [openAvailableFor, setOpenAvailableFor] = useState(false)
    const [availableForValue, setAvailableForValue] = useState("")
    const [openPropertyStatus, setOpenPropertyStatus] = useState(false)
    const [propertyStatusValue, setPropertyStatusValue] = useState("")

useEffect(() => {
    setIsFeaturedValue(isFeatured ? "yes" : "no")
    setAvailableForValue(availableFor)
    setPropertyStatusValue(status)
}   ,[])


    return (
        <FormWrapper
            title="Enter Property Basic Information"
            description="Please provide all the below information to proceed further"
        >
            <div className="w-[350px] space-y-5 lg:w-[400px]">

                {/* Property Name */}
                <div className="space-y-2">
                    <Label>Property Name</Label>
                    <Input
                        type="text"
                        value={name}
                        
                        placeholder="Enter Property Name"
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>

                {/* Property Address */}
                <div className="space-y-2">
                    <Label>Property Address</Label>
                    <Textarea
                        placeholder="Enter Property Address"
                        
                        value={address}
                        onChange={(e) => updateForm({ address: e.target.value })}
                    />
                </div>

                {/* Mark As Featured */}
                <div className="space-y-2  ">
                    <Label>Mark as Featured</Label>
                    <Popover open={openIsFeatured} onOpenChange={setOpenIsFeatured} >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openIsFeatured}
                                className="w-full justify-between"
                            >
                                {isFeaturedvalue
                                    ? isFeaturedList.find((item) => item.value === isFeaturedvalue)?.label
                                    : "Select If Featured..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setIsFeaturedValue(currentValue === isFeaturedvalue ? "" : currentValue)
                                                setOpenIsFeatured(false)
                                                console.log(currentValue)
                                                updateForm({ isFeatured: (item.value == "yes" ? true : false) })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    isFeaturedvalue === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                </div>

                {/* Property Available For */}
                <div className="space-y-2  ">
                    <Label>Property Available For</Label>
                    <Popover open={openAvailableFor} onOpenChange={setOpenAvailableFor}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openAvailableFor}
                                className="w-full justify-between"
                            >
                                {availableForValue
                                    ? availableForList.find((item) => item.value === availableForValue)?.label
                                    : "Select Available For..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setAvailableForValue(currentValue === availableForValue.toLocaleLowerCase() ? "" : item.value)
                                                setOpenAvailableFor(false)
                                                console.log(currentValue)
                                                updateForm({ availableFor: item.value })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    availableForValue === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                </div>
                
                {/* Property Status */}
                <div className="space-y-2  ">
                    <Label>Property Available For</Label>
                    <Popover open={openPropertyStatus} onOpenChange={setOpenPropertyStatus}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openPropertyStatus}
                                className="w-full justify-between"
                            >
                                {propertyStatusValue
                                    ? propertyStatusList.find((item) => item.value == propertyStatusValue)?.label
                                    : "Select Property Status..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setPropertyStatusValue(currentValue == propertyStatusValue.toLocaleLowerCase() ? "" : item.value)
                                                setOpenPropertyStatus(false)
                                                console.log(currentValue)
                                                updateForm({ status: item.value })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    propertyStatusValue == item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                </div>

            </div>

            {/* </form> */}
            {/* </Form>/ */}
        </FormWrapper >
    )
}

export default PropertyBasicInfo
