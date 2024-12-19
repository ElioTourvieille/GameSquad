"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Id } from "../convex/_generated/dataModel";

export function NotificationsList() {
  const notifications = useQuery(api.notifications.getNotifications)
  const markAsRead = useMutation(api.notifications.markAsRead)

  const handleMarkAsRead = async (notificationId: Id<"notifications">) => {
    await markAsRead({ notificationId })
  }

  return (
    <Card className="bg-indigo-950 border border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-400">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!notifications ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 bg-purple-500/20" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-indigo-300">No notifications</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`p-3 rounded-lg ${
                  notification.read ? 'bg-indigo-900/20' : 'bg-indigo-900/40 border-l-4 border-purple-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-indigo-100">{notification.message}</p>
                    <p className="text-sm text-indigo-300">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}