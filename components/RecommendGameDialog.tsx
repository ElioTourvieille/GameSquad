"use client"

import { useState } from "react"
import { AnimatedDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecommendGameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecommendGameDialog({ open, onOpenChange }: RecommendGameDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    gameStyle: "",
    currentLevel: "",
    comment: ""
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const recommendGame = useMutation(api.game.recommendGame)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.rating || !formData.gameStyle) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await recommendGame({
        name: formData.name,
        rating: formData.rating,
        gameStyle: formData.gameStyle,
        currentLevel: formData.currentLevel,
        comment: formData.comment
      })
      
      toast({
        title: "Success",
        description: "Game recommended successfully!",
      })
      
      onOpenChange(false)
      setFormData({
        name: "",
        rating: 0,
        gameStyle: "",
        currentLevel: "",
        comment: ""
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to recommend game. Please try again.",
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
          <DialogTitle className="text-purple-100">Recommend a Game</DialogTitle>
          <DialogDescription className="text-purple-300">
            Share your favorite games with the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="game" className="text-sm font-medium text-purple-400">
              Game Name
            </label>
            <Input
              id="game"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter game name"
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-400">
              Game Style
            </label>
            <Select
              value={formData.gameStyle}
              onValueChange={(value) => setFormData(prev => ({ ...prev, gameStyle: value }))}
            >
              <SelectTrigger className="bg-indigo-900/50 border-purple-500/20 text-indigo-100">
                <SelectValue placeholder="Select game style" />
              </SelectTrigger>
              <SelectContent className="bg-indigo-950 border-purple-500/20">
                <SelectItem value="action" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Action</SelectItem>
                <SelectItem value="rpg" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">RPG</SelectItem>
                <SelectItem value="strategy" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Strategy</SelectItem>
                <SelectItem value="fps" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">FPS</SelectItem>
                <SelectItem value="mmo" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">MMO</SelectItem>
                <SelectItem value="moba" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">MOBA</SelectItem>
                <SelectItem value="sports" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-400">
              Your Current Level
            </label>
            <Select
              value={formData.currentLevel}
              onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}
            >
              <SelectTrigger className="bg-indigo-900/50 border-purple-500/20 text-indigo-100">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent className="bg-indigo-950 border-purple-500/20">
                <SelectItem value="beginner" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Intermediate</SelectItem>
                <SelectItem value="advanced" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Advanced</SelectItem>
                <SelectItem value="expert" className="text-purple-100 hover:bg-purple-500/10 focus:bg-purple-500/10">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-400">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    star <= (hoveredRating || formData.rating)
                      ? "text-purple-400 fill-current"
                      : "text-purple-400/30"
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-400">
              Comment (Optional)
            </label>
            <Input
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your thoughts about the game"
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Recommending..." : "Recommend"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </AnimatedDialog>
  )
}