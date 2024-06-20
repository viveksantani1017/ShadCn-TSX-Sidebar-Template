"use client"

import { use, useEffect, useState } from "react"
import { FormItems } from "@/app/properties/addProperty/page"
import FormWrapper from "./FormWrapper"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Label } from "../ui/label"
import { Check, ChevronsUpDown } from "lucide-react"

type stepProps = FormItems & {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void
}

const PropertyPurchaseInfo = ({
    updateForm,
    purchaseInfo,


}: stepProps) => {


    const brokerageChargeTypeList = [
        { label: "Fixed", value: "Fixed" },
        { label: "Percentage", value: "Percentage" },
    ] as const

    const [openBrokerageChargeType, setOpenBrokerageChargeType] = useState(false)
    const [brokerageChargeTypeValue, setBrokerageChargeTypeValue] = useState("")

    useEffect(() => {
        setBrokerageChargeTypeValue(purchaseInfo.brokerageChargeType)
    })

    return (
        <FormWrapper
            title="Enter Property Purchase Information"
            description="Please provide all the below information to proceed further"
        >
            <div className="w-[350px] space-y-5 lg:w-[400px]">

                {/* Property Purchase Amount */}
                <div className="space-y-2">
                    <Label>Property Purchase Amount</Label>
                    <Input
                        type="text"
                        placeholder="Enter Property Purchase Amount"
                        value={purchaseInfo.amount}
                        onChange={(e) => updateForm({ purchaseInfo: { ...purchaseInfo, amount: Number(e.target.value) } })}
                    />
                </div>

                {/* Property Brokerage Charge Type */}
                <div className="space-y-2  ">
                    <Label> Property Brokerage Charge Type</Label>
                    <Popover open={openBrokerageChargeType} onOpenChange={setOpenBrokerageChargeType}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openBrokerageChargeType}
                                className="w-full justify-between"
                            >
                                {brokerageChargeTypeValue
                                    ? brokerageChargeTypeList.find((item) => item.value === brokerageChargeTypeValue)?.label
                                    : "Select Brokerage Charge Type ..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search ..." />
                                <CommandEmpty>No options found.</CommandEmpty>
                                <CommandGroup>
                                    {brokerageChargeTypeList.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            onSelect={(currentValue) => {
                                                setBrokerageChargeTypeValue(currentValue === brokerageChargeTypeValue.toLocaleLowerCase() ? "" : item.value)
                                                setOpenBrokerageChargeType(false)
                                                console.log(currentValue)
                                                updateForm({ purchaseInfo: { ...purchaseInfo, brokerageChargeType: item.value } })
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    brokerageChargeTypeValue === item.value ? "opacity-100" : "opacity-0"
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

                {/* Property Brokerage Charge Type Value */}
                <div className="space-y-2  ">
                    <Label>Property Brokerage Charge Type Value</Label>
                    <Input
                        type="text"
                        value={purchaseInfo.brokerageChargeTypeValue}
                        placeholder="Enter Brokerage Charge Type Value"
                        onChange={(e) => updateForm({ purchaseInfo: { ...purchaseInfo, brokerageChargeTypeValue: Number(e.target.value) } })}
                    />
                </div>

                {/* Property Brokerage Charge Amount */}
                <div className="space-y-2  ">
                    <Label>Property Brokerage Charge Amount</Label>
                    <Input
                        type="text"
                        value={purchaseInfo.brokerageChargeAmount}
                        placeholder="Enter Property Brokerage Charge Amount"
                        onChange={(e) => updateForm({ purchaseInfo: { ...purchaseInfo, brokerageChargeAmount: Number(e.target.value) } })}
                    />
                </div>

            </div>


        </FormWrapper >
    )
}

export default PropertyPurchaseInfo
