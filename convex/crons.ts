import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Clean expired sessions every day at midnight
crons.daily(
  "clean-expired-sessions",
  {
    hourUTC: 0, // Midnight UTC
    minuteUTC: 0,
  },
  internal.sessions.cleanExpiredSessions
);

export default crons; 