import { internalMutation } from "./_generated/server";

export const cleanExpiredSessions = internalMutation({
  handler: async (ctx) => {
    const now = new Date();
    
    // Get all expired sessions
    const expiredSessions = await ctx.db
      .query("sessions")
      .filter(q => q.lt(q.field("date"), now.toISOString()))
      .collect();

    // Delete sessions and their participants
    await Promise.all(
      expiredSessions.map(async (session) => {
        // Delete participants
        const participants = await ctx.db
          .query("sessionParticipants")
          .filter(q => q.eq(q.field("sessionId"), session._id))
          .collect();

        await Promise.all(
          participants.map(participant => 
            ctx.db.delete(participant._id)
          )
        );

        // Delete session
        await ctx.db.delete(session._id);

        // Create a notification for the creator
        await ctx.db.insert("notifications", {
          userId: session.creatorId,
          type: "session_expired",
          message: `Your session for ${session.game} has expired`,
          read: false,
          createdAt: Date.now(),
          relatedId: session._id,
        });
      })
    );
  },
}); 