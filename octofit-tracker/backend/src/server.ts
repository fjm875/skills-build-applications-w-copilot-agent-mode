import cors from 'cors';
import express from 'express';
import { Activity, LeaderboardEntry, seedDatabase, Team, User, Workout } from './models';
import { connectToDatabase, MONGO_URI } from './config/database';

const DEFAULT_PORT = 8000;
const PORT = Number(process.env.PORT || DEFAULT_PORT);

function getApiBaseUrl(): string {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${DEFAULT_PORT}`;
}

// Backend application entry point for the OctoFit API.
interface AppDependencies {
  userModel?: typeof User;
  teamModel?: typeof Team;
  activityModel?: typeof Activity;
  leaderboardModel?: typeof LeaderboardEntry;
  workoutModel?: typeof Workout;
}

export function createApp(dependencies: AppDependencies = {}): express.Express {
  const app = express();
  const userModel = dependencies.userModel || User;
  const teamModel = dependencies.teamModel || Team;
  const activityModel = dependencies.activityModel || Activity;
  const leaderboardModel = dependencies.leaderboardModel || LeaderboardEntry;
  const workoutModel = dependencies.workoutModel || Workout;

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      message: 'OctoFit Tracker API is running',
      apiUrl: getApiBaseUrl(),
    });
  });

  app.get('/api/config', (_req, res) => {
    res.json({
      apiUrl: getApiBaseUrl(),
      port: PORT,
    });
  });

  app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await userModel.find({});
    res.json(users);
  });

  app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await teamModel.find({});
    res.json(teams);
  });

  app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activityModel.find({});
    res.json(activities);
  });

  app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboardModel.find({});
    res.json(leaderboard);
  });

  app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workoutModel.find({});
    res.json(workouts);
  });

  return app;
}

async function startServer(): Promise<void> {
  try {
    const app = createApp();
    await connectToDatabase(MONGO_URI);
    console.log('Connected to MongoDB at', MONGO_URI);

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await seedDatabase();
      console.log('Seeded the octofit_db database with test data');
    }

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export const app = createApp();
