"use client"

import { useEffect, useState } from "react"

import { FormItems } from "@/app/properties/addProperty/page"
import FormWrapper from "./FormWrapper"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Label } from "../ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import { getAllAmenities } from "@/services/amenties"
import { Amenity} from "../datatable/data/schema"
import { Badge } from "../ui/badge"
import { GiCancel } from "react-icons/gi"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useToast } from "../ui/use-toast"

type stepProps = FormItems & {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void
}



const PropertyAmenityInfo = ({
    updateForm,
    amenities
}: stepProps) => {

    const { toast } = useToast()

    const [openAmenity, setOpenAmenity] = useState(false)
    const [amenityValue, setAmenityValue] = useState<Amenity>({ id: 0, iconName: "", name: "" })
    const [amenityCustomValue, setAmenityCustomValue] = useState("")
    const [amenityData, setAmenityData] = useState<Amenity[]>([]);
    const [chips, setChips] = useState<{id:number,name:string,iconName:string,value:string}[]>([])
    const { data: amenityQueryData, isSuccess, isLoading } = useQuery<Amenity[]>({ queryKey: ['areas'], queryFn: getAllAmenities })
    useEffect(() => {
        if (isLoading) {
            <Loading />
        }
        if (isSuccess) {
            setAmenityData(amenityQueryData)
            setChips(amenities.map((amenity)=>{return {
                id:amenity.amenityId,
                name:amenityQueryData.find((item:any)=>item.id == amenity.amenityId)?.name || "",
                iconName:amenityQueryData.find((item:any)=>item.id == amenity.amenityId)?.iconName || "",
                value:amenity.value
            }}))
        }
    }, [amenityQueryData, isLoading, isSuccess])

    return (
        <FormWrapper
            title="Enter Property Amenities"
            description="Please provide all the below information to proceed further"
        >
            <div className="w-[350px] space-y-5 lg:w-[400px]">
                {/* Property Amnenity */}
                <div className="space-y-2  ">
                    <Label>Property Amnenity</Label>
                    <Popover open={openAmenity} onOpenChange={setOpenAmenity}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openAmenity}
                                className="w-full justify-between"
                            >
                                {amenityValue?.id
                                    ? amenityData.find((item) => item.id === amenityValue.id)?.name
                                    : "Select Property Amnenity..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                            </Button>
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
                                            onSelect={(currentValue) => {
                                                setAmenityValue(Number(currentValue) === amenityValue?.id ? { id: 0, iconName: "", name: '' } : item)
                                                setOpenAmenity(false)
                                                console.log(currentValue)
                                                console.log(item)
                                                setAmenityCustomValue("")

                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    amenityValue?.id === item.id ? "opacity-100" : "opacity-0"
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
                {/* Project Name */}
                <div className="space-y-2">
                    <Label>Amenity Value</Label>
                    <Input
                        type="text"
                        placeholder="Enter Amenity Value"
                    value={amenityCustomValue}
                    onChange={(e) => {setAmenityCustomValue(e.target.value)} }
                    />
                    <Button
                        onClick={(e: any) => {
                            e.preventDefault()
                            console.log(amenityValue.id + "amenityValue")
                            if (amenityValue.id == 0) {
                                toast({
                                    variant: "destructive",
                                    description: "Please select an Amenity",
                                })
                            } else if (chips.find((chip) => chip.id === amenityValue.id)) {
                                toast({
                                    variant: "destructive",
                                    description: `${amenityValue.name} already added.`,
                                })
                            }
                            else {
                                setChips([...chips, {
                                    id:amenityValue.id,
                                    name:amenityValue.name,
                                    iconName:amenityValue.iconName,
                                    value:amenityCustomValue}])                                
                                    updateForm({amenities:[...amenities,{amenityId:amenityValue.id,value:amenityCustomValue}]})
                                setAmenityCustomValue("")
                            }
                        }}
                    >Add</Button>
                </div>
                {/* Chips  */}
                <div className="flex w-full items-center justify-center overflow-hidden flex-wrap gap-x-5 gap-y-3">
                    {chips.map((chip) => (
                        <Badge variant="secondary" className=" flex flex-col items-center justify-center flex-wrap h-[35px]">
                            {chip.name}
                            <img src={`/amenityIcons/${chip.iconName}`} alt="icon" className="ml-5 h- w-5" />
                            {chip.value!==""?<span className="ml-5">Value: {chip.value}</span>:null}
                            {/* <span className="ml-5">Value: {chip.value}</span> */}
                            <TooltipProvider >
                                <Tooltip >
                                    <TooltipTrigger>
                                        <GiCancel className="h-4 w-4 ml-5 cursor-pointer transition ease duration-300 hover:scale-[1.2]"
                                            onClick={(e: any) => {
                                                e.preventDefault()
                                                console.log(chip)
                                                updateForm({amenities:amenities.filter((amenity)=>amenity.amenityId!==chip.id)})
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

            {/* </form> */}
            {/* </Form>/ */}
        </FormWrapper >
    )
}

export default PropertyAmenityInfo
