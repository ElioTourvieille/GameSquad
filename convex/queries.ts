import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getGameRecommendations = query({
  handler: async (ctx) => {
    const recommendations = await ctx.db
      .query("games")
      .order("desc")
      .take(10);

    const recommendersWithUsers = await Promise.all(
      recommendations.map(async (rec) => {
        const user = await ctx.db.get(rec.recommenderId);
        return {
          ...rec,
          recommender: user ? {
            username: user.username || "Anonymous",
            email: user.email,
          } : null,
          isOwnRecommendation: user?._id === (await getAuthUserId(ctx))
        };
      })
    );

    return recommendersWithUsers;
  },
});

export const getUpcomingSessions = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const sessions = await ctx.db
      .query("sessions")
      .order("desc")
      .take(5);

    const creators = await Promise.all(
      sessions.map(async (session) => {
        const creator = await ctx.db.get(session.creatorId);
        return {
          ...session,
          creator: creator ? {
            username: creator.username || "Anonymous",
            email: creator.email,
          } : null,
          isOwnSession: creator?._id === userId
        };
      })
    );

    return creators;
  },
});

export const createGameRecommendation = mutation({
  args: {
    name: v.string(),
    gameStyle: v.string(),
    currentLevel: v.string(),
    rating: v.number(),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const gameId = await ctx.db.insert("games", {
      ...args,
      recommenderId: userId,
      createdAt: Date.now(),
    });

    await ctx.db.insert("notifications", {
      userId,
      type: "game_recommendation",
      message: `New game recommended: ${args.name}`,
      read: false,
      createdAt: Date.now(),
      relatedId: gameId
    });

    return gameId;
  },
}); 