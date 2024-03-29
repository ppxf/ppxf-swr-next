import { Metadata } from "next"

import RegisterForm from "@/components/RegisterForm"

export const metadata: Metadata = {
  title: "Register",
  description: "Register your account",
}

export default function Register() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <RegisterForm />
    </div>
  )
}
