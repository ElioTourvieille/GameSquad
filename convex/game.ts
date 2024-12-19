import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const recommendGame = mutation({
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

export const createSession = mutation({
  args: {
    game: v.string(),
    event: v.string(),
    date: v.string(),
    maxParticipants: v.number(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const sessionId = await ctx.db.insert("sessions", {
      ...args,
      creatorId: userId,
      createdAt: Date.now(),
    });

    return sessionId;
  },
});

export const getUpcomingSessions = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const now = new Date();

    const sessions = await ctx.db
      .query("sessions")
      .filter(q => q.gte(q.field("date"), now.toISOString()))
      .order("asc")
      .take(5);

    const sessionsWithCreators = await Promise.all(
      sessions.map(async (session) => {
        const creator = await ctx.db.get(session.creatorId);
        
        const participants = await ctx.db
          .query("sessionParticipants")
          .filter(q => q.eq(q.field("sessionId"), session._id))
          .collect();

        const isParticipating = participants.some(p => p.userId === userId);

        return {
          ...session,
          creator: creator ? {
            username: creator.username || "Anonymous",
            email: creator.email,
          } : null,
          participantCount: participants.length,
          isOwnSession: creator?._id === userId,
          isParticipating
        };
      })
    );

    return sessionsWithCreators;
  },
});

export const joinSession = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");

    const participants = await ctx.db
      .query("sessionParticipants")
      .filter(q => q.eq(q.field("sessionId"), args.sessionId))
      .collect();

    if (participants.length >= session.maxParticipants) {
      throw new Error("Session is full");
    }

    const existingParticipant = participants.find(p => p.userId === userId);
    if (existingParticipant) {
      throw new Error("Already joined this session");
    }

    await ctx.db.insert("sessionParticipants", {
      sessionId: args.sessionId,
      userId,
      joinedAt: Date.now(),
    });

    await ctx.db.insert("notifications", {
      userId: session.creatorId,
      type: "session_joined",
      message: "Someone joined your gaming session",
      read: false,
      createdAt: Date.now(),
      relatedId: args.sessionId,
    });
  },
});

export const leaveSession = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const participant = await ctx.db
      .query("sessionParticipants")
      .filter(q => 
        q.and(
          q.eq(q.field("sessionId"), args.sessionId),
          q.eq(q.field("userId"), userId)
        )
      )
      .first();

    if (!participant) throw new Error("Not participating in this session");

    await ctx.db.delete(participant._id);
  },
});