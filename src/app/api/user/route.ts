import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      image: true,
      name: true,
    },
  })

  return NextResponse.json(result)
}
