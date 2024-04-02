"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useFetch, useMutationFetch } from "@/hooks/swr"
import { CountState, useCountStore } from "@/stores/counter"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { shallow } from "zustand/shallow"

import { updateSchema } from "@/lib/schema"
import DialogWrapper from "../DialogWrapper/page"
import ErrorMessage from "../ErrorMessage/page"

type Inputs = z.infer<typeof updateSchema>

export default function UserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(updateSchema),
  })
  const [visible, setVisible] = useState(false)
  const [avactor, setAvactor] = useState("/next.svg")
  const [increment, decrement, reset] = useCountStore(
    (state: CountState) => [state.increment, state.decrement, state.reset],
    shallow
  )
  const count = useCountStore((state: CountState) => state.count)
  const { data: user, error, mutate } = useFetch("/api/user")
  const { trigger } = useMutationFetch("/api/user/update")

  if (error) {
    return <ErrorMessage message={error} />
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await trigger({
        ...data,
      })

      if (result) {
        toast.success("更新成功")
        setVisible(false)
        mutate({ ...data })
      }
    } catch (error) {
      toast.error(error as string)
    }
  }

  useEffect(() => {
    if (user && user.image) {
      setAvactor(user.image)
    }
  }, [])

  return (
    <>
      {user && (
        <div className="flex flex-col">
          <p className="mb-5 text-4xl font-medium">
            欢迎回来:{user.name || "打工人"}
          </p>
          <div className="flex w-max flex-col gap-5 bg-white py-5">
            <Image
              className="mb-10"
              src={avactor}
              height={150}
              width={150}
              alt="头像"
            />
            <div className="text-xl">昵称: {user.name}</div>
            <div className="text-xl">邮箱: {user.email}</div>
            <div className="text-xl">电话: {user.phoneNumber}</div>
            <DialogWrapper
              title="用户信息更新"
              trigger={
                <button className="h-10 w-max rounded-lg bg-red-600 px-10 py-2.5 text-white">
                  编辑
                </button>
              }
              open={visible}
              onOpenChange={setVisible}
            >
              <form
                onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
                className="w-full"
              >
                <label className="mb-1 inline-block self-start" htmlFor="name">
                  昵称:
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="mb-3 h-10 w-full rounded-md border border-solid border-black indent-3"
                />
                {errors.email && (
                  <p className="mb-6 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <label className="mb-1 inline-block self-start" htmlFor="email">
                  邮箱:
                </label>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  className="mb-3 h-10 w-full rounded-md border border-solid border-black indent-3"
                />
                {errors.email && (
                  <p className="mb-6 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <label
                  className="mb-1 inline-block self-start"
                  htmlFor="phoneNumber"
                >
                  电话:
                </label>
                <input
                  {...register("phoneNumber", { required: true })}
                  id="phoneNumber"
                  className="mb-3 h-10 w-full rounded-md border border-solid border-black indent-3"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
                <button
                  className="mt-5 h-10 w-full rounded-lg bg-red-600 text-white"
                  type="submit"
                >
                  保存
                </button>
              </form>
            </DialogWrapper>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <button
              className="rounded-sm bg-red-600 p-2 text-lg leading-none text-white"
              onClick={increment}
            >
              +
            </button>
            <span>{count}</span>
            <button
              className="rounded-sm bg-red-600 p-2 text-lg leading-none text-white"
              onClick={decrement}
            >
              -
            </button>
            <button
              className="rounded-sm bg-red-600 p-2 text-lg leading-none text-white"
              onClick={reset}
            >
              重置
            </button>
          </div>
        </div>
      )}
    </>
  )
}
