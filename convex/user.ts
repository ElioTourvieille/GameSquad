import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserById = query({
    args: {
        Id: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .filter((q)=> q.eq(q.field("_id"), args.Id))
        .unique()

        return user;
    }
});
