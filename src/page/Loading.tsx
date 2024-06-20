import { RiLoader2Line } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <RiLoader2Line className="h-[40px] w-[40px] animate-spin" />
      <h1>Please wait</h1>
    </div>
  )
}
