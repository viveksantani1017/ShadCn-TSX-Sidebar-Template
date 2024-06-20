"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
// import { userLogin } from "@/services/users"
import { useMutation } from "@tanstack/react-query"
import { LuHome } from "react-icons/lu"

import { Credentials, Response } from "@/types/index"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { PasswordInput } from "@/components/ui/PasswordInput"

export default function Login() {
  const { toast } = useToast()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("")
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("")
//   const mutation = useMutation({
//     mutationFn: userLogin,
//     onSuccess: async (data: Response) => {
//       if (data.status >= 400 && data.status < 500) {
//         toast({
//           variant: "destructive",
//           description: data.message,
//           duration: 1500,
//         })
//       } else if (data.status == 500) {
//         toast({
//           variant: "destructive",
//           description: "Something Went Wrong",
//           duration: 1500,
//         })
//       } else if(data.status == 200) {
//         localStorage.setItem("user", data.token!!)
//         window.location.reload()
//       }
//     },
//   })

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    setEmail(e.target.value)
    if (emailPattern.test(e.target.value)) setErrorMessageEmail("")
    else setErrorMessageEmail("Enter a Valid Email.")
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    const lowerCase = /[a-z]/g
    const upperCase = /[A-Z]/g
    const numbers = /[0-9]/g
    const specialSymbols = /[^A-Za-z 0-9]/g
    if (!lowerCase.test(e.target.value)) {
      setErrorMessagePassword(
        "Password must contains atleast one lowercase letter."
      )
    } else if (!upperCase.test(e.target.value)) {
      setErrorMessagePassword(
        "Password must contains atleast one uppercase letter."
      )
    } else if (!numbers.test(e.target.value)) {
      setErrorMessagePassword("Password must contains atleast one digit.")
    } else if (e.target.value.length < 8) {
      setErrorMessagePassword("Password must be minimum 8 characters long.")
    } else if (!specialSymbols.test(e.target.value)) {
      setErrorMessagePassword(
        "Password must contains atleast one special character."
      )
    } else {
      setErrorMessagePassword("")
    }
  }

  const requestData: Credentials = {
    email,
    password,
    // firebaseToken: process.env.NEXT_PUBLIC_FIREBASETOKEN!!,
    firebaseToken: "",
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if (!email || !password) {
      setErrorMessagePassword("Email or Password must not be Empty.")
    }
    //  else {
    //   if (!errorMessageEmail && !errorMessagePassword)
    //     mutation.mutate(requestData)
    // }
  }
  return (
    <>
      <div className="container flex h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium uppercase">
            <LuHome />
            Internal-Portal
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Tagline for Internal-Portal&rdquo;</p>
              <footer className="text-sm">Owner Name</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login To Internal-Portal Admin
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to login.
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  <div className="grid gap-2 ">
                    <Label className="" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={email}
                      onChange={onChangeEmail}
                    //   disabled={mutation.isPending}
                    />
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errorMessageEmail}
                    </div>
                    <Label className="" htmlFor="password">
                      Password
                    </Label>
                    <PasswordInput
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChangePassword}
                      autoCapitalize="none"
                      autoComplete="current-password"
                    />

                    <div style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {errorMessagePassword}
                    </div>
                  </div>
                  <Button 
                //   disabled={mutation.isPending}
                  >
                    {/* {mutation.isPending && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )} */}
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
