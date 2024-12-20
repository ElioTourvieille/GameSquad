"use client"

import { useState } from "react"
import { AnimatedDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"
import { Search, User, UserPlus } from "lucide-react"

interface AddFriendDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export function AddFriendDialog({ open, onOpenChangeAction }: AddFriendDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()
  
  const searchResults = useQuery(api.users.searchUsers, 
    isSearching ? { search: searchQuery } : { search: "" }
  )
  const sendFriendRequest = useMutation(api.friends.sendFriendRequest)

  const handleSearch = () => {
    // Check if the search query is empty
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username or email to search",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    // Check if the search results are empty
    if (searchResults?.length === 0) {
      toast({
        title: "No results",
        description: "No user found with this username or email",
        variant: "destructive",
      })
    }
  }

  const handleSendRequest = async (userId: string) => {
    try {
      await sendFriendRequest({ targetUserId: userId })
      toast({
        title: "Success",
        description: "Friend request sent successfully!",
      })
      setSearchQuery("")
      setIsSearching(false)
      onOpenChangeAction(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send friend request",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <AnimatedDialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[425px] bg-indigo-950 border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-purple-100">Add Friends</DialogTitle>
          <DialogDescription className="text-purple-300">
            Search for users by username or email
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by username or email..."
              className="bg-indigo-900/50 border-purple-500/20 text-indigo-100 placeholder:text-purple-300/50"
            />
            <Button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {isSearching && searchResults?.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-2 rounded-md bg-indigo-900/30">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-purple-100">{user.username}</p>
                    <p className="text-sm text-purple-300">{user.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleSendRequest(user._id)}
                  variant="ghost"
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </AnimatedDialog>
  )
} 