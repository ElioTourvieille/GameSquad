"use client"

import { useState } from "react"
import { AnimatedDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"

interface UsernameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsernameDialog({ open, onOpenChange }: UsernameDialogProps) {
  const [username, setUsername] = useState("")
  const { toast } = useToast()
  const updateUsername = useMutation(api.users.updateUsername)

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      await updateUsername({ username: username.trim() })
      toast({
        title: "Success",
        description: "Your username has been updated",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to update username",
        variant: "destructive",
      })
    }
  }

  return (
    <AnimatedDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-indigo-950 border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-purple-100">Choose a username</DialogTitle>
          <DialogDescription className="text-purple-300">
            This username will be visible to other users
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex space-x-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
            />
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Validate
            </Button>
          </div>
        </div>
      </DialogContent>
    </AnimatedDialog>
  )
} 