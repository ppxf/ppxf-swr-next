import { Metadata } from "next"

import LoginButton from "@/components/LoginButton"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <LoginButton />
    </div>
  )
}
