"use client"

import { useState } from "react"
import { AnimatedDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSessionDialog({ open, onOpenChange }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState({
    game: "",
    event: "",
    date: "",
    maxParticipants: "4",
    difficulty: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const createSession = useMutation(api.game.createSession)
  const { toast } = useToast()

  // Create a gaming session
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.game || !formData.event || !formData.date || !formData.difficulty) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createSession({
        game: formData.game,
        event: formData.event,
        date: formData.date,
        maxParticipants: parseInt(formData.maxParticipants),
        difficulty: formData.difficulty,
      })
      
      toast({
        title: "Success",
        description: "Gaming session created successfully!",
      })
      
      onOpenChange(false)
      setFormData({
        game: "",
        event: "",
        date: "",
        maxParticipants: "4",
        difficulty: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatedDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-indigo-950 border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-purple-100">Create Gaming Session</DialogTitle>
          <DialogDescription className="text-purple-300">
            Set up a new gaming session with your friends.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="game" className="text-sm font-medium text-purple-400">
              Game
            </label>
            <Input
              id="game"
              value={formData.game}
              onChange={(e) => setFormData(prev => ({ ...prev, game: e.target.value }))}
              placeholder="Enter game name"
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="event" className="text-sm font-medium text-purple-400">
              Event Type
            </label>
            <Input
              id="event"
              value={formData.event}
              onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
              placeholder="e.g., Casual Play, Ranked, Quest"
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-purple-400">
                Date & Time
              </label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-indigo-900/50 border-purple-500/20 text-indigo-100"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="players" className="text-sm font-medium text-purple-400">
                Max Players
              </label>
              <Input
                id="players"
                type="number"
                min="2"
                max="100"
                value={formData.maxParticipants}
                onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                className="bg-indigo-900/50 border-purple-500/20 text-indigo-100"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="difficulty" className="text-sm font-medium text-purple-400">
              Difficulty
            </label>
            <Select 
              value={formData.difficulty}
              onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
            >
              <SelectTrigger className="bg-indigo-900/50 border-purple-500/20 text-indigo-100">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-indigo-950 border-purple-500/20">
                <SelectItem value="beginner" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Intermediate</SelectItem>
                <SelectItem value="advanced" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Advanced</SelectItem>
                <SelectItem value="expert" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </AnimatedDialog>
  )
}