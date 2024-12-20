"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Id } from "../convex/_generated/dataModel";

export default function UpcomingSessions() {
  const sessions = useQuery(api.game.getUpcomingSessions);
  const joinSession = useMutation(api.game.joinSession);
  const leaveSession = useMutation(api.game.leaveSession);
  const { toast } = useToast();

  const handleJoin = async (sessionId: Id<"sessions">) => {
    try {
      await joinSession({ sessionId });
      toast({
        title: "Success!",
        description: "You've joined the session",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join session",
        variant: "destructive",
      });
    }
  };

  const handleLeave = async (sessionId: Id<"sessions">) => {
    try {
      await leaveSession({ sessionId });
      toast({
        title: "Success!",
        description: "You've left the session",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to leave session",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-indigo-950 border border-purple-500/20 shadow-xl hover:scale-[1.01] transition-transform duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-400">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Sessions</span>
        </CardTitle>
        <CardDescription className="text-indigo-300">
          Join gaming sessions with friends
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!sessions ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-indigo-900/30 space-y-3">
                <Skeleton className="h-6 w-48 bg-purple-500/20" />
                <Skeleton className="h-4 w-32 bg-indigo-500/20" />
                <div className="flex items-center space-x-6">
                  <Skeleton className="h-6 w-24 rounded-full bg-purple-500/20" />
                  <Skeleton className="h-4 w-20 bg-indigo-500/20" />
                </div>
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center p-6 text-indigo-300">
            <p>No upcoming sessions</p>
            <p className="text-sm mt-2 text-indigo-400">Create one to get started!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session._id} className="p-4 rounded-lg bg-indigo-900/30">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-100">{session.game}</h3>
                    <p className="text-sm text-purple-300">
                      Created by {session.creator?.username || "Anonymous"}
                    </p>
                    <p className="text-sm text-indigo-300 mt-1">
                      {new Date(session.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      {session.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-indigo-300">
                      <Users className="h-4 w-4 mr-1" />
                      {session.participantCount}/{session.maxParticipants}
                    </div>
                    {!session.isOwnSession && (
                      <Button
                        onClick={() => session.isParticipating ? handleLeave(session._id) : handleJoin(session._id)}
                        className="w-full sm:w-auto"
                      >
                        {session.isParticipating ? "Leave" : "Join"}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}