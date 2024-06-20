"use client"

import { Separator } from "@/components/ui/separator"
import { FormItems } from "@/app/properties/addProperty/page"

import FormWrapper from "./FormWrapper"

type StepProps = FormItems & {
  goTo: (index: number) => void
}

const FinalStep = ({
  name,address,isFeatured,availableFor,status,details,goTo
}: StepProps) => {
  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
        <div className="w-full bg-neutral-900 p-4 mt-2 rounded-md border border-neutral-700">
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                Property Name
              </h4>
              <span className="text-white">{name}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Property Address
              </h4>
              <span className="text-white">{address}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Is Featured
              </h4>
              <span className="text-white">{isFeatured.toString()}</span>
             <h4 className="font-semibold text-white md:text-lg mt-1">
                Property Available For
              </h4>
              <span className="text-white">{availableFor}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Property Status
              </h4>
              <span className="text-white">{status}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Project Name
              </h4>
              <span className="text-white">{details.projectName}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Property BHK
              </h4>
              <span className="text-white">{details.bhk}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Project Carpet Area
              </h4>
              <span className="text-white">{details.carpetArea}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Project Super Built Up Area
              </h4>
              <span className="text-white">{details.superBuiltUpArea}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Project Age In Years
              </h4>
              <span className="text-white">{details.ageInYears}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Project Furnishing Status
              </h4>
              <span className="text-white">{details.furnishingStatus}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Ready To Move In
              </h4>
              <span className="text-white">{details.readyToMoveIn ? "Yes":"No"}</span>
              <h4 className="font-semibold text-white md:text-lg mt-1">
                Maintainance Per Month
              </h4>
              <span className="text-white">{details.maintenancePricePerMonth}</span>
            </div>
          </div>
        </div>
    </FormWrapper>
  )
}

export default FinalStep
