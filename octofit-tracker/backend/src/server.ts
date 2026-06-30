import express from 'express';
import { Activity, connectToDatabase, LeaderboardEntry, seedDatabase, Team, User, Workout } from './models';

const app = express();
const DEFAULT_PORT = 8000;
const PORT = Number(process.env.PORT || DEFAULT_PORT);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

function getApiBaseUrl(): string {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }

  return `http://localhost:${DEFAULT_PORT}`;
}

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
  const users = await User.find({}).lean();
  res.json(users);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate('userId', 'name').lean();
  res.json(activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

async function startServer(): Promise<void> {
  try {
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

startServer();
