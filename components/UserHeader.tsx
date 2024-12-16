import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GamepadIcon as GameController, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-indigo-950 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <GameController className="h-8 w-8 text-purple-100" /> 
          <h1 className="text-2xl text-purple-400 font-orbitron font-bold">GameSquad</h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Input className="w-64" placeholder="Search games or friends" />
          <Button variant="ghost"><Bell className="h-6 w-6" /></Button>
          <Button variant="ghost"><User className="h-6 w-6" /></Button>
        </div>
      </div>
    </header>
  )
}  