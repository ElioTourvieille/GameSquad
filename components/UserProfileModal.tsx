"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import {
  AnimatedDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export function UserProfileModal({
  open,
  onOpenChangeAction,
}: {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
}) {
  const router = useRouter();
  const user = useQuery(api.users.getMe);
  const friends = useQuery(api.friends.getFriends);
  const updateUsername = useMutation(api.users.updateUsername);
  const { toast } = useToast();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user?.username]);

  const handleClose = () => {
    router.refresh();
    onOpenChangeAction(false);
  };

  const handleUpdateUsername = async () => {
    try {
      await updateUsername({ username });
      toast({
        title: "Success",
        description: "Username updated successfully",
      });
      handleClose();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update username",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatedDialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-indigo-950 border border-purple-500/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-400">
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-indigo-300">
            Manage your profile information and view your friends list.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-indigo-900/50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
            >
              Friends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-purple-300">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-indigo-900/50 border-purple-500/20 text-purple-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-purple-300">
                  <User className="h-4 w-4" />
                  Username
                </label>
                <div className="flex gap-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-indigo-900/50 border-purple-500/20 text-purple-100"
                    placeholder="Enter username"
                  />
                  <Button
                    onClick={handleUpdateUsername}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                    disabled={!username || username === user?.username}
                  >
                    Update
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="friends" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-300">
                <Users className="h-5 w-5" />
                <h3 className="text-lg font-medium">Your Friends</h3>
              </div>
              {!friends?.length ? (
                <div className="text-center py-8 bg-indigo-900/30 rounded-lg">
                  <p className="text-indigo-300">No friends yet</p>
                  <p className="text-sm text-indigo-400 mt-1">
                    Start adding friends to see them here!
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {friends?.filter(Boolean).map((friend) => (
                    <li
                      key={friend._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-indigo-900/30 border border-purple-500/10 hover:border-purple-500/20 transition-colors"
                    >
                      <div>
                        <p className="text-purple-100 font-medium">
                          {friend.username || "Anonymous"}
                        </p>
                        <p className="text-sm text-indigo-400">{friend.email}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </AnimatedDialog>
  );
}
