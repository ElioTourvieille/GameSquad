import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      <Card className="bg-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Bell className="h-5 w-5 text-purple-400" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-indigo-100">
            <li>Alice started playing Elden Ring</li>
            <li>Bob recommends God of War</li>
            <li>Charlie invited you to a Fortnite session</li>
          </ul>
          <Button variant="ghost" className="mt-4 text-indigo-300">View all notifications</Button>
        </CardContent>
      </Card>
      <Card className="bg-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Calendar className="h-5 w-5 text-purple-400" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-indigo-100">
            <li>Destiny 2 Raid - Tomorrow, 8 PM</li>
            <li>Among Us Party - Saturday, 9 PM</li>
            <li>Valorant Tournament - Sunday, 2 PM</li>
          </ul>
          <Button variant="ghost" className="mt-4 text-indigo-300">View full calendar</Button>
        </CardContent>
      </Card>
    </aside>
  )
}
