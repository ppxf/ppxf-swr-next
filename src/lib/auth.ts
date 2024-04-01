import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "邮箱",
          type: "text",
          placeholder: "请输入邮箱",
        },
        password: {
          label: "密码",
          type: "password",
          placeholder: "请输入密码",
        },
      },
      async authorize(credentials) {
        if (credentials) {
          const { email, password } = credentials

          const userWithEmail = await prisma.user.findUnique({
            where: { email },
          })
          if (!userWithEmail) {
            throw new Error("Email is invalid,please to sign up")
          }
          if (userWithEmail.password !== password) {
            throw new Error("password is invalid")
          }

          if (userWithEmail) {
            return userWithEmail
          } else {
            throw new Error("Not Authorized.")
          }
        } else {
          throw new Error("Not Authorized.")
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
      }

      return session
    },
  },
}
