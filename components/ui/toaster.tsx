"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className="bg-indigo-950 border border-purple-500/20 text-purple-100"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-purple-100">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-purple-300">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-purple-400 hover:text-purple-300" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}