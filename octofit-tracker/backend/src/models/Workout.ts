import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    recommendedFor: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);