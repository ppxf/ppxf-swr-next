"use client"

import { useRouter } from "next/navigation"
import { useMutationFetch } from "@/hooks/swr"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { emailPasswordSchema } from "@/lib/schema"

type Inputs = z.infer<typeof emailPasswordSchema>

export default function RegisterForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(emailPasswordSchema),
  })
  const { isMutating, trigger } = useMutationFetch("api/register")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await trigger(data)

      if (result) {
        toast.success("注册成功")
        router.push("/login")
      }
    } catch (err) {
      toast.error(err as string)
    }
  }

  return (
    <form
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      className="flex w-80 flex-col items-center justify-center rounded-xl bg-zinc-800/25 p-10"
    >
      <h1 className="mb-5 w-full text-center text-3xl text-white">注册</h1>
      <label className="mb-2 self-start text-white" htmlFor="email">
        邮箱:
      </label>
      <input
        id="email"
        {...register("email", { required: true })}
        className="mb-2 h-10 w-full indent-3"
      />
      {errors.email && (
        <p className="mb-5 text-sm text-red-500">{errors.email.message}</p>
      )}
      <label className="mb-2 self-start text-white" htmlFor="password">
        密码:
      </label>
      <input
        {...register("password", { required: true })}
        id="password"
        className="mb-2 h-10 w-full indent-3"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <button
        disabled={isMutating}
        className="mt-5 h-10 w-full rounded-lg bg-red-600 text-white"
        type="submit"
      >
        注册
      </button>
    </form>
  )
}
