import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, ShoppingBag, PlayCircle, UserPlus } from 'lucide-react'

export default function RecentAlerts() {
  const alerts = [
    { 
      user: "David", 
      action: "bought", 
      game: "Cyberpunk 2077",
      timestamp: "2h ago",
      icon: ShoppingBag
    },
    { 
      user: "Eva", 
      action: "joined", 
      game: "World of Warcraft",
      timestamp: "3h ago",
      icon: UserPlus
    },
    { 
      user: "Frank", 
      action: "started playing", 
      game: "Stardew Valley",
      timestamp: "5h ago",
      icon: PlayCircle
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case 'bought':
        return 'text-emerald-400';
      case 'joined':
        return 'text-blue-400';
      case 'started playing':
        return 'text-amber-400';
      default:
        return 'text-purple-400';
    }
  }

  return (
    <Card className="bg-indigo-950 border border-purple-500/20 shadow-xl hover:scale-[1.01] transition-transform duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-400">
          <Bell className="h-5 w-5 text-purple-400" />
          <span>Recent Alerts</span>
        </CardTitle>
        <CardDescription className="text-indigo-300">
          Stay updated on your friends' gaming activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-900/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <alert.icon className={`h-5 w-5 ${getActionColor(alert.action)}`} />
                <div className="flex flex-col">
                  <span className="text-indigo-100">
                    <strong className="text-purple-400">{alert.user}</strong>
                    <span className="mx-1.5">{alert.action}</span>
                    <strong className="text-indigo-200">{alert.game}</strong>
                  </span>
                  <span className="text-xs text-indigo-400 mt-1">{alert.timestamp}</span>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`border-${getActionColor(alert.action)} ${getActionColor(alert.action)}`}
              >
                {alert.action.toUpperCase()}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}