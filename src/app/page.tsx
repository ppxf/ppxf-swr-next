import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import UserInfo from "@/components/UserInfo"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-5">
        {user ? (
          <UserInfo />
        ) : (
          <>
            <Link
              href="/login"
              className="mb-5 h-10 w-max rounded-lg bg-red-600 px-10 py-2.5 text-white"
            >
              前往登录
            </Link>
            <Link
              href="/register"
              className="h-10 w-max rounded-lg bg-red-600 px-10 py-2.5 text-white"
            >
              前往注册
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
