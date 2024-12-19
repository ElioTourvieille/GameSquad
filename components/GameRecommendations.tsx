"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function GameRecommendations() {
  const recommendations = useQuery(api.queries.getGameRecommendations);

  return (
    <Card className="bg-indigo-950 border border-purple-500/20 shadow-xl hover:scale-[1.01] transition-transform duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-400">
          <Users className="h-5 w-5" />
          <span>Game Recommendations</span>
        </CardTitle>
        <CardDescription className="text-indigo-300">
          Check out what your friends are playing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!recommendations ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-indigo-900/30 space-y-3">
                <Skeleton className="h-6 w-48 bg-purple-500/20" />
                <Skeleton className="h-4 w-32 bg-indigo-500/20" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-6 w-24 rounded-full bg-purple-500/20" />
                  <Skeleton className="h-4 w-20 bg-indigo-500/20" />
                </div>
              </div>
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center p-6 text-indigo-300">
            <p>No recommendations yet</p>
            <p className="text-sm mt-2 text-indigo-400">Be the first to recommend a game!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {recommendations.map((rec) => (
              <li 
                key={rec._id} 
                className="p-4 rounded-lg bg-indigo-900/30"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-purple-100">{rec.name}</h3>
                    <p className="text-sm text-purple-300">
                      Recommended by {rec.recommender?.username || "Anonymous"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      {rec.gameStyle.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-indigo-300">Level {rec.currentLevel}</span>
                      <div className="flex">
                        {[...Array(rec.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4 text-purple-400 fill-current" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {rec.comment && (
                  <p className="mt-2 text-sm text-indigo-300 line-clamp-2">
                    {rec.comment}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}