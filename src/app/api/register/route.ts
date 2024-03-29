import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body
  const userWithEmail = await prisma.user.findUnique({
    where: { email },
  })
  if (userWithEmail) {
    throw new Error("Email already exists.")
  }
  const result = await prisma.user.create({
    data: { email, password },
  })

  return NextResponse.json(result)
}
