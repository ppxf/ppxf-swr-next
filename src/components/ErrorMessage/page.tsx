"use client"

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="text-2xl font-medium">Something went wrong!</h2>
      <div className="text-lg font-medium text-red-600">{message}</div>
    </div>
  )
}
