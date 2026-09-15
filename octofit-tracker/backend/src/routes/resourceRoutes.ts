import { Router } from 'express';
import type { Model } from 'mongoose';

type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

export function createResourceRouter(resource: ResourceName, model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const data = await model.find().lean();

      response.json({
        resource,
        data,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}