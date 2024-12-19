"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Id } from "../convex/_generated/dataModel";

export default function FriendRequests() {
  const requests = useQuery(api.friends.getFriendRequests);
  const acceptRequest = useMutation(api.friends.acceptFriendRequest);
  const rejectRequest = useMutation(api.friends.rejectFriendRequest);
  const { toast } = useToast();

  if (!requests || requests.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">
          Friend Requests
        </h2>
        <p className="text-indigo-300">No pending requests</p>
      </div>
    );
  }

  const handleAccept = async (requestId: Id<"friendRequests">) => {
    try {
      await acceptRequest({ requestId });
      toast({
        title: "Request accepted",
        description: "You are now friends !",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to accept request",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: Id<"friendRequests">) => {
    try {
      await rejectRequest({ requestId });
      toast({
        title: "Request rejected",
        description: "The request has been rejected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to reject request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-400">
        Friend Requests
      </h2>
      <ul className="space-y-4">
        {requests.map((request) => (
          <li 
            key={request._id} 
            className="flex items-center justify-between p-4 rounded-lg bg-indigo-900/50"
          >
            <div>
              <p className="text-indigo-100">
                {request.fromUser?.username || "Unknown"}
              </p>
              <p className="text-sm text-indigo-300">
                Sent on {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleAccept(request._id)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleReject(request._id)}
                variant="outline"
                className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
              >
                Reject
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 