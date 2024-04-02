"use client"

import React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type DialogData = {
  trigger: React.ReactNode
  title?: string
  confirmText?: string
  open: boolean
  onOpenChange: (data: boolean) => void
}

const DialogWrapper = ({
  children,
  trigger,
  title,
  open,
  onOpenChange,
  confirmText,
}: Readonly<{
  children: React.ReactNode
}> &
  DialogData) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <DialogHeader>
        {title && (
          <DialogTitle className="m-0 mb-5 text-2xl font-medium">
            {title}
          </DialogTitle>
        )}
      </DialogHeader>
      {children}
      {confirmText && (
        <div className="mt-[25px] flex justify-center">
          <DialogClose asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-600 px-[15px] font-medium leading-none text-white focus:shadow-[0_0_0_2px] focus:outline-none">
              {confirmText}
            </button>
          </DialogClose>
        </div>
      )}
    </DialogContent>
  </Dialog>
)

export default DialogWrapper
