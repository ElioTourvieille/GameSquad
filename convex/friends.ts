import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { Id } from "./_generated/dataModel";

export const searchUsers = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (!args.query.trim()) return [];

    const users = await ctx.db
      .query("users")
      .filter(q => 
        q.or(
          q.eq(q.field("email"), args.query),
          q.eq(q.field("username"), args.query)
        )
      )
      .collect();

    return users.map(user => ({
      id: user._id,
      username: user.username || "Anonymous",
      email: user.email,
    }));
  },
})

export const sendFriendRequest = mutation({
  args: { targetUserId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingRequest = await ctx.db
      .query("friendRequests")
      .filter(q => 
        q.and(
          q.eq(q.field("fromUserId"), userId),
          q.eq(q.field("toUserId"), args.targetUserId)
        )
      )
      .first();

    if (existingRequest) {
      throw new Error("Friend request already sent");
    }

    const requestId = await ctx.db.insert("friendRequests", {
      fromUserId: userId,
      toUserId: args.targetUserId,
      status: "pending",
      createdAt: Date.now(),
    });

    await ctx.db.insert("notifications", {
      userId: args.targetUserId,
      type: "friend_request",
      message: "You have a new friend request",
      read: false,
      createdAt: Date.now(),
      relatedId: requestId,
    });

    return requestId;
  },
})

export const getFriendRequests = query({
  handler: async (ctx) => {
    const auth = await getAuthUserId(ctx);
    if (!auth) return [];

    const requests = await ctx.db
      .query("friendRequests")
      .filter(q => 
        q.and(
          q.eq(q.field("toUserId"), auth),
          q.eq(q.field("status"), "pending")
        )
      )
      .collect();

    const requestsWithUsers = await Promise.all(
      requests.map(async (request) => {
        const fromUser = await ctx.db.get(request.fromUserId as Id<"users">);
        return {
          ...request,
          fromUser
        };
      })
    );

    return requestsWithUsers;
  },
})

export const acceptFriendRequest = mutation({
  args: { requestId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId)
    if (!request) throw new Error("Request not found")

    await ctx.db.patch(args.requestId, {
      status: "accepted"
    });

    await ctx.db.insert("notifications", {
      userId: request.fromUserId,
      type: "friend_request_accepted",
      message: "Your friend request has been accepted",
      read: false,
      createdAt: Date.now(),
      relatedId: args.requestId
    });
  },
})

export const rejectFriendRequest = mutation({
  args: { requestId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId)
    if (!request) throw new Error("Request not found")

    await ctx.db.delete(args.requestId);

    await ctx.db.insert("notifications", {
      userId: request.fromUserId,
      type: "friend_request_rejected",
      message: "Your friend request has been rejected",
      read: false,
      createdAt: Date.now(),
      relatedId: args.requestId
    });
  },
})

export const getFriends = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const friendships = await ctx.db
      .query("friendRequests")
      .filter(q => 
        q.and(
          q.or(
            q.eq(q.field("fromUserId"), userId),
            q.eq(q.field("toUserId"), userId)
          ),
          q.eq(q.field("status"), "accepted")
        )
      )
      .collect();

    const friendIds = friendships.map(f => 
      f.fromUserId === userId ? f.toUserId : f.fromUserId
    );

    const friends = await Promise.all(
      friendIds.map(id => ctx.db.get(id as Id<"users">))
    );

    return friends.filter((friend): friend is NonNullable<typeof friend> => friend !== null);
  },
}); 