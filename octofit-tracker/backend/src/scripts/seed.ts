import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'Octo Sprinters',
        mascot: 'Volt',
        captain: 'maya-runner',
        memberCount: 8,
        weeklyPoints: 1280,
      },
      {
        name: 'Core Crushers',
        mascot: 'Flex',
        captain: 'liam-lifts',
        memberCount: 6,
        weeklyPoints: 1115,
      },
      {
        name: 'Trail Blazers',
        mascot: 'Summit',
        captain: 'noah-trails',
        memberCount: 7,
        weeklyPoints: 980,
      },
    ]);

    await User.insertMany([
      {
        username: 'maya-runner',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        profileImage: '/images/profiles/maya.png',
        teamName: 'Octo Sprinters',
        totalPoints: 620,
      },
      {
        username: 'liam-lifts',
        email: 'liam@example.com',
        displayName: 'Liam Patel',
        profileImage: '/images/profiles/liam.png',
        teamName: 'Core Crushers',
        totalPoints: 575,
      },
      {
        username: 'noah-trails',
        email: 'noah@example.com',
        displayName: 'Noah Rivera',
        profileImage: '/images/profiles/noah.png',
        teamName: 'Trail Blazers',
        totalPoints: 490,
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya-runner',
        activityType: 'Interval Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        points: 125,
        completedAt: new Date('2026-09-14T13:30:00Z'),
      },
      {
        username: 'liam-lifts',
        activityType: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 380,
        points: 110,
        completedAt: new Date('2026-09-14T18:15:00Z'),
      },
      {
        username: 'noah-trails',
        activityType: 'Trail Hike',
        durationMinutes: 90,
        caloriesBurned: 610,
        points: 135,
        completedAt: new Date('2026-09-13T15:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        username: 'maya-runner',
        teamName: 'Octo Sprinters',
        points: 620,
        streakDays: 12,
      },
      {
        rank: 2,
        username: 'liam-lifts',
        teamName: 'Core Crushers',
        points: 575,
        streakDays: 9,
      },
      {
        rank: 3,
        username: 'noah-trails',
        teamName: 'Trail Blazers',
        points: 490,
        streakDays: 6,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        targetMuscles: ['hips', 'hamstrings', 'shoulders'],
        recommendedFor: 'Recovery days and new members',
      },
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        targetMuscles: ['quads', 'glutes', 'calves'],
        recommendedFor: 'Runners building race pace endurance',
      },
      {
        title: 'Full-Body Power Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 45,
        targetMuscles: ['core', 'back', 'legs', 'chest'],
        recommendedFor: 'Experienced members chasing leaderboard points',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
