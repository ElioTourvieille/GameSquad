import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUnreadCount = query({
  handler: async (ctx) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) return 0;

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", q => 
        q.eq("userId", auth.tokenIdentifier)
      )
      .filter(q => q.eq(q.field("read"), false))
      .collect();

    return notifications.length;
  },
});

export const markAsRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { read: true });
  },
});

export const createNotification = mutation({
  args: {
    userId: v.string(),
    type: v.string(),
    message: v.string(),
    relatedId: v.optional(v.union(v.id("friendRequests"), v.id("games"))),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("notifications", {
      ...args,
      read: false,
      createdAt: Date.now(),
    });
  },
});

export const getNotifications = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const notifications = await ctx.db
      .query("notifications")
      .filter(q => q.eq(q.field("userId"), userId))
      .order("desc")
      .take(10);

    return notifications;
  },
});