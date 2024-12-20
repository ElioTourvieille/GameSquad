"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState, useEffect } from "react"
import { UsernameDialog } from "@/components/UsernameDialog"
import GameRecommendations from "@/components/GameRecommendations"
import { Sidebar } from "@/components/Sidebar"
import UpcomingSessions from "@/components/UpcomingSessions"
import FriendRequests from "@/components/FriendRequests"
import { PageTransition } from "@/components/PageTransition"

export default function User() {
  const [showUsernameDialog, setShowUsernameDialog] = useState(false)
  const user = useQuery(api.users.getMe);

  useEffect(() => {
    if (user && !user.username) {
      setShowUsernameDialog(true)
    }
  }, [user])
// 
  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <UsernameDialog 
          open={showUsernameDialog} 
          onOpenChangeAction={setShowUsernameDialog} 
        />
        <div className="relative">
          <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <main className="flex-grow space-y-8">
              <div className="rounded-lg bg-indigo-900/30 p-6">
                <FriendRequests />
              </div>
              <GameRecommendations />
              <UpcomingSessions />
            </main>
            <aside className="w-full lg:w-80 space-y-6">
              <Sidebar />
            </aside>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
