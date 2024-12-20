"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GamepadIcon as GameController, User, LogOut, Plus, UserPlus, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { RecommendGameDialog } from "@/components/RecommendGameDialog";
import { CreateSessionDialog } from "@/components/CreateSessionDialog";
import { AddFriendDialog } from "@/components/AddFriendDialog";
import { UserProfileModal } from "./UserProfileModal";

export default function UserHeader() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const closeDropdownAndOpen = (callback: () => void) => {
    // Close dropdown before opening modal
    setIsDropdownOpen(false);
    setTimeout(callback, 100); // Slight delay to avoid conflicts
  };

  return (
    <header className="bg-indigo-950 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <GameController className="h-8 w-8 text-purple-100" />
            <h1 className="text-2xl text-purple-400 font-orbitron font-bold">
              GameSquad
            </h1>
          </div>
          <button
            className="md:hidden text-purple-400 hover:text-purple-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setIsRecommendOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Recommend Game
            </Button>
            <Button 
              variant="ghost"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setIsCreateSessionOpen(true)}
            >
              <GameController className="h-4 w-4 mr-2" />
              Create Session
            </Button>
            <Button 
              variant="ghost" 
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setIsAddFriendOpen(true)}
            >
              <UserPlus className="h-6 w-6" />
            </Button>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 relative z-50">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-indigo-950 border-purple-500/20 z-50"
              >
                <DropdownMenuItem
                  data-focus-on-close
                  onClick={() => closeDropdownAndOpen(() => setIsProfileOpen(true))}
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut} 
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full text-left text-purple-400 hover:text-purple-300"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsRecommendOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Recommend Game
            </Button>
            <Button 
              variant="ghost"
              className="w-full text-left text-purple-400 hover:text-purple-300"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCreateSessionOpen(true);
              }}
            >
              <GameController className="h-4 w-4 mr-2" />
              Create Session
            </Button>
            <Button 
              variant="ghost"
              className="w-full text-left text-purple-400 hover:text-purple-300"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAddFriendOpen(true);
              }}
            >
              <UserPlus className="h-6 w-6 mr-2" />
              Add Friend
            </Button>
            <hr className="border-purple-500/20" />
            <Button
              variant="ghost"
              className="w-full text-left text-purple-400 hover:text-purple-300"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProfileOpen(true);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left text-purple-400 hover:text-purple-300"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
      <RecommendGameDialog 
        open={isRecommendOpen} 
        onOpenChangeAction={setIsRecommendOpen} 
      />
      <CreateSessionDialog 
        open={isCreateSessionOpen} 
        onOpenChangeAction={setIsCreateSessionOpen} 
      />
      <AddFriendDialog 
        open={isAddFriendOpen} 
        onOpenChangeAction={setIsAddFriendOpen}
      />
      <UserProfileModal
        open={isProfileOpen}
        onOpenChangeAction={setIsProfileOpen}
      />
    </header>
  );
}
