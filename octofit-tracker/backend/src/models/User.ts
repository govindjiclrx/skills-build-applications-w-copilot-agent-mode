import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true },
    teamName: { type: String, required: true },
    totalPoints: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);