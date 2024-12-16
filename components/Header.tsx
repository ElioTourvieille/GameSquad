
import { Button } from "@/components/ui/button";
import { GamepadIcon as GameController } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-indigo-950 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <GameController className="h-8 w-8 text-purple-100" />
          <h1 className="text-3xl text-purple-400 font-orbitron font-bold">
            GameSquad
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-12">
          <a href="#about" className="text-purple-100 hover:text-white text-lg">
            About
          </a>
          <a href="#contact" className="text-purple-100 hover:text-white text-lg">
            Contact
          </a>
        </nav>

        {/* Call-to-Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/signin">
          <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-lg">
            Login
          </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
