"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import AppartmentImage from "@/public/img/Appartment.jpg"
import OfficeImage from "@/public/img/Office.jpg"
import TenamentImage from "@/public/img/Tenament.jpg"

import { FormItems } from "@/app/properties/addProperty/page"

import { Card, CardContent } from "../ui/card"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import FormWrapper from "./FormWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Label } from "../ui/label"
import { Check, ChevronsUpDown } from "lucide-react"

type stepProps = FormItems & {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void
}



const PropertyDetails = ({
    updateForm,
    details,
}: stepProps) => {


    const furnishingStatusList = [
        { label: "Unfurnished", value: "Unfurnished" },
        { label: "SemiFurnished", value: "SemiFurnished" },
        { label: "Furnished", value: "Furnished" }
    ] as const

    const readyToMoveInList = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ] as const

    const [openFurnishingStatus, setOpenFurnishingStatus] = useState(false)
    const [furnishingStatusValue, setFurnishingStatusValue] = useState("")
    const [openReadyToMoveIn, setOpenReadyToMoveIn] = useState(false)
    const [readyToMoveInValue, setReadyToMoveInValue] = useState("")

    useEffect(() => {
        setFurnishingStatusValue(details.furnishingStatus)
        setReadyToMoveInValue(details.readyToMoveIn ? "yes" : "no")
    }, [])

    return (
        <FormWrapper
            title="Enter Property Details"
            description="Please provide all the below information to proceed further"
        >
            <div className="w-[350px] space-y-5 lg:w-[400px]">
                {/* Project Name */}
                <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                        type="text"
                        placeholder="Enter Project Name"
                        value={details.projectName}
                        onChange={(e) => updateForm({ details: { ...details, projectName: e.target.value } })}
                    />
                </div>
                {/* Property BHK */}
                <div className="space-y-2">
                    <Label>Property BHK</Label>
                    <Input
                        type="text"
                        placeholder="Enter Project BHK"
                        value={details.bhk}
                        onChange={(e) => updateForm({ details: { ...details, bhk: Number(e.target.value) } })}
                    />
                </div>
                {/* Property Carpert Area */}
                <div className="space-y-2">
                    <Label>Carpert Area</Label>
                    <Input
                        type="text"
                        placeholder="Enter Project Carpert Area"
                        value={details.carpetArea}
                        onChange={(e) => updateForm({ details: { ...details, carpetArea: e.target.value } })}
                    />
                </div>
                {/* Property Carpert Area */}
                <div className="space-y-2">
                    <Label>Super BuiltUp Area</Label>
                    <Input
                        type="text"
                        placeholder="Enter Project Super BuiltUp Area"
                        value={details.superBuiltUpArea}
                        onChange={(e) => updateForm({ details: { ...details, superBuiltUpArea: e.target.value } })}
                    />
                </div>
                {/* Property Carpert Area */}
                <div className="space-y-2">
                    <Label>Age In Years</Label>
                    <Input
                        type="text"
                        placeholder="Enter Project Carpert Area"
                        value={details.ageInYears}
                        onChange={(e) => updateForm({ details: { ...details, ageInYears: Number(e.target.value) } })}
                    />
                </div>
                {/* Furnishing Status */}
                <div className="space-y-2  ">
                    <Label>Furnishing Status</Label>
                    <Popover open={openFurnishingStatus} onOpenChange={setOpenFurnishingStatus}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openFurnishingStatus}
                                className="w-full justify-between"
                            >
                                {furnishingStatusValue
                                    ? furnishingStatusList.find((item) => item.value === furnishingStatusValue)?.label
                                    : "Select Furnishing Status..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setFurnishingStatusValue(currentValue === furnishingStatusValue.toLocaleLowerCase() ? "" : item.value)
                                                setOpenFurnishingStatus(false)
                                                console.log(currentValue)
                                                updateForm({ details: { ...details, furnishingStatus: item.value } })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    furnishingStatusValue === item.value ? "opacity-100" : "opacity-0"
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
                {/* Property Ready To Move In */}
                <div className="space-y-2  ">
                    <Label>Property Ready To Move In</Label>
                    <Popover open={openReadyToMoveIn} onOpenChange={setOpenReadyToMoveIn}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openReadyToMoveIn}
                                className="w-full justify-between"
                            >
                                {readyToMoveInValue
                                    ? readyToMoveInList.find((item) => item.value === readyToMoveInValue)?.label
                                    : "Select Ready To Move In..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setReadyToMoveInValue(currentValue === readyToMoveInValue ? "" : item.value)
                                                setOpenReadyToMoveIn(false)
                                                console.log(currentValue)
                                                updateForm({ details: { ...details, readyToMoveIn: item.value === "yes" ? true : false } })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    readyToMoveInValue === item.value ? "opacity-100" : "opacity-0"
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
                {/* Maintenance Price Per Month */}
                <div className="space-y-2">
                    <Label>Maintenance Price Per Month</Label>
                    <Input
                        type="text"
                        placeholder="Enter Maintenance Price Per Month"
                        value={details.maintenancePricePerMonth}
                        onChange={(e) => updateForm({ details: { ...details, maintenancePricePerMonth: Number(e.target.value) } })}
                    />
                </div>
            </div>

            {/* </form> */}
            {/* </Form>/ */}
        </FormWrapper >
    )
}

export default PropertyDetails
