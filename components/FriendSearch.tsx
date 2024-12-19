"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export function FriendSearch() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const results = useQuery(api.users.searchUsers, { search });
  const sendFriendRequest = useMutation(api.friends.sendFriendRequest);
  const { toast } = useToast();

  const handleSearch = () => {
    setHasSearched(true);
    if (hasSearched && results && results.length === 0) {
      toast({
        title: "No results",
        description: "No user found with this username or email",
        variant: "destructive",
      });
    }
  };

  const handleSendRequest = async (userId: string) => {
    try {
      await sendFriendRequest({ targetUserId: userId });
      toast({
        title: "Friend request sent!",
        description: "The user will be notified of your request",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send friend request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or username"
          className="bg-indigo-900/50"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {hasSearched && results && results.length > 0 && (
        <div className="space-y-2">
          {results.map((user) => (
            <div key={user._id} className="flex items-center justify-between p-2 rounded bg-indigo-900/30">
              <div>
                <p className="text-indigo-100">{user.username || "No username"}</p>
                <p className="text-sm text-indigo-300">{user.email}</p>
              </div>
              <Button
                onClick={() => handleSendRequest(user._id)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add Friend
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 