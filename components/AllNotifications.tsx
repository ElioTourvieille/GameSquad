"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Id } from "@/convex/_generated/dataModel"

export function AllNotifications() {
  const notifications = useQuery(api.notifications.getNotifications) ?? [];
  const markAsRead = useMutation(api.notifications.markAsRead);

  const handleMarkAsRead = async (notificationId: Id<"notifications">) => {
    await markAsRead({ notificationId });
  };

  return (
    <Card className="bg-indigo-950 border border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-purple-400">All Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li 
              key={notification._id}
              className="p-4 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 transition-colors cursor-pointer"
              onClick={() => handleMarkAsRead(notification._id)}
            >
              <p className="text-indigo-100">{notification.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-indigo-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(notification.createdAt, { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </span>
                {!notification.read && (
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    New
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 