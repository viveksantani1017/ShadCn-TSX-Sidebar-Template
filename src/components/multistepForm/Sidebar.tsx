type NavProps = {
  currentStepIndex: number
  goTo: (index: number) => void
}

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 h-full rounded-md border border-primary-700 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${
                currentStepIndex === 0 ? "text-[#ffe666]" : ""
              } md:text-base`}
            >
              Your info
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-sm ${
                currentStepIndex === 1 ? "text-[#bd284d]" : ""
              } md:text-base`}
            >
              Select plan
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(2)}
              className={`text-sm ${
                currentStepIndex === 2 ? "text-[#E7B8FF]" : ""
              } md:text-base`}
            >
              Add-ons
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 4
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-sm ${
                currentStepIndex === 3 ? "text-[#6fe79f]" : ""
              } md:text-base`}
            >
              Propety Type
            </button>
          </li>

          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 5
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(4)}
              className={`text-sm ${
                currentStepIndex === 4 ? "text-[#6fe79f]" : ""
              } md:text-base`}
            >
              Basic Information
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 6
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(5)}
              className={`text-sm ${
                currentStepIndex === 5 ? "text-[#6fe79f]" : ""
              } md:text-base`}
            >
              Final Step
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
