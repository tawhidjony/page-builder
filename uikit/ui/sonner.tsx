"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, ToasterProps } from "sonner"

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}


type ToastType = {
  message: string
}

const Success = ({ message }: ToastType) => {
  return toast.success(message)
}

const Error = ({ message }: ToastType) => {
  return toast.error(message)
}

const Warning = ({ message }: ToastType) => {
  return toast.warning(message)
}

const Info = ({ message }: ToastType) => {
  return toast.info(message)
}

const Loading = ({ message }: ToastType) => {
  return toast.loading(message)
}

export const Toast = {
  Success,
  Error,
  Warning,
  Info,
  Loading,
}
