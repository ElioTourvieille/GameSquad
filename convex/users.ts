import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const updateUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (args.username.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }

    await ctx.db.patch(userId, {
      username: args.username,
    });
  },
});

export const getMe = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);

    return user;
  },
});

export const searchUsers = query({
  args: { search: v.string() },
  handler: async (ctx, args) => {
    const auth = await getAuthUserId(ctx);
    if (!auth) return [];

    const users = await ctx.db
      .query("users")
      .filter(q => 
        q.or(
          q.eq(q.field("email"), args.search),
          q.eq(q.field("username"), args.search)
        )
      )
      .collect();

    return users.filter(user => user._id !== auth);
  },
});
