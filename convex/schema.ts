import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    username: v.optional(v.string()),
  }),
  friendRequests: defineTable({
    fromUserId: v.string(),
    toUserId: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  notifications: defineTable({
    userId: v.string(),
    type: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
    relatedId: v.optional(v.union(v.id("friendRequests"), v.id("games"), v.id("sessions"))),
  }).index("by_user", ["userId"]),

  games: defineTable({
    name: v.string(),
    rating: v.number(),
    gameStyle: v.string(),
    currentLevel: v.string(),
    recommenderId: v.id("users"),
    comment: v.optional(v.string()),
    createdAt: v.number(),
  }),

  sessions: defineTable({
    game: v.string(),
    event: v.string(),
    date: v.string(),
    maxParticipants: v.number(),
    difficulty: v.string(),
    creatorId: v.id("users"),
    createdAt: v.number(),
  }),

  sessionParticipants: defineTable({
    sessionId: v.id("sessions"),
    userId: v.id("users"),
    joinedAt: v.number(),
    status: v.optional(v.string()),
  })
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_session_and_user", ["sessionId", "userId"]),
});