import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);