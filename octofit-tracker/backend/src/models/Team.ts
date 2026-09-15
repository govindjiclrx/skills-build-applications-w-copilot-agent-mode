import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
    weeklyPoints: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);