import { SignInFormPassword } from "@/components/SignInFormPassword";
import { GamepadIcon as GameController } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

export default function SignIn() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
          <div className="flex items-center space-x-4">
            <GameController className="h-8 w-8 text-purple-100" />
            <h1 className="text-3xl text-purple-400 font-orbitron font-bold">
              GameSquad
            </h1>
          </div>
          </Link>
        </div>
        <div className="relative w-full py-12 flex justify-center items-center h-[calc(100vh-85px)]">
          <div className="absolute inset-0 opacity-10 bg-center"
            style={{
              backgroundImage: "url('/gaming.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="relative z-10 w-full max-w-md px-6">
            <div className="bg-indigo-950/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 shadow-2xl">
              <SignInFormPassword />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
