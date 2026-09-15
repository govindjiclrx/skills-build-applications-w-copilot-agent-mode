import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
import { createResourceRouter } from './resourceRoutes.js';

const apiRouter = Router();

apiRouter.use('/users', createResourceRouter('users', User));
apiRouter.use('/teams', createResourceRouter('teams', Team));
apiRouter.use('/activities', createResourceRouter('activities', Activity));
apiRouter.use('/leaderboard', createResourceRouter('leaderboard', LeaderboardEntry));
apiRouter.use('/workouts', createResourceRouter('workouts', Workout));

export default apiRouter;