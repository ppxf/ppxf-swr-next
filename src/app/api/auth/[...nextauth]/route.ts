import { authOptions } from "@/lib/auth";

import { type DefaultSession } from "next-auth";

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
