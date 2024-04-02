import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const body = await req.json()
  const { email, name, phoneNumber } = body

  //验证邮箱是否存在
  const userWithEmail = await prisma.user.findUnique({
    where: { email: email },
  })
  if (userWithEmail && userWithEmail.email && userWithEmail.id !== user.id) {
    throw new Error("Email already in already taken")
  }

  //验证手机号码是否存在
  const userWithPhoneNumber = await prisma.user.findFirst({
    where: { phoneNumber },
  })
  if (
    userWithPhoneNumber &&
    userWithPhoneNumber.phoneNumber &&
    userWithPhoneNumber.id !== user.id
  ) {
    throw new Error("Phone number is already taken")
  }

  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      email: email,
      phoneNumber: phoneNumber,
      name: name,
    },
  })

  return NextResponse.json(result)
}
