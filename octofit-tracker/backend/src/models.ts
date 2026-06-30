import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
  weeklyTarget: number;
}

export interface ITeam extends Document {
  name: string;
  focus: string;
  members: number;
  captain: string;
}

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  points: number;
  streak: number;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  weeklyTarget: { type: Number, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  focus: { type: String, required: true },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout: Model<IWorkout> = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);

export async function connectToDatabase(uri = 'mongodb://127.0.0.1:27017/octofit_db'): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(uri);
}

export async function seedDatabase(): Promise<void> {
  const users = [
    {
      name: 'Ava Patel',
      email: 'ava.patel@example.com',
      role: 'admin',
      fitnessGoal: 'Improve endurance',
      weeklyTarget: 5,
    },
    {
      name: 'Marcus Chen',
      email: 'marcus.chen@example.com',
      role: 'member',
      fitnessGoal: 'Build strength',
      weeklyTarget: 4,
    },
    {
      name: 'Nia Brooks',
      email: 'nia.brooks@example.com',
      role: 'member',
      fitnessGoal: 'Increase mobility',
      weeklyTarget: 3,
    },
  ];

  const teams = [
    {
      name: 'Momentum Squad',
      focus: 'Endurance',
      members: 8,
      captain: 'Ava Patel',
    },
    {
      name: 'Peak Performers',
      focus: 'Strength',
      members: 6,
      captain: 'Marcus Chen',
    },
  ];

  const workouts = [
    {
      title: 'Morning Mobility',
      difficulty: 'easy',
      duration: 25,
      focus: 'mobility',
    },
    {
      title: 'HIIT Circuit',
      difficulty: 'hard',
      duration: 35,
      focus: 'cardio',
    },
    {
      title: 'Strength Builder',
      difficulty: 'medium',
      duration: 45,
      focus: 'strength',
    },
  ];

  await Promise.all([
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
    User.deleteMany({}),
  ]);

  const createdUsers = await User.insertMany(users, { ordered: false });

  const activities = [
    {
      userId: createdUsers[0]._id,
      type: 'run',
      duration: 32,
      calories: 320,
      date: new Date('2026-06-28T06:30:00.000Z'),
    },
    {
      userId: createdUsers[1]._id,
      type: 'strength',
      duration: 45,
      calories: 280,
      date: new Date('2026-06-29T18:00:00.000Z'),
    },
    {
      userId: createdUsers[2]._id,
      type: 'mobility',
      duration: 20,
      calories: 120,
      date: new Date('2026-06-30T07:00:00.000Z'),
    },
  ];

  const leaderboardEntries = [
    {
      userId: createdUsers[0]._id,
      name: 'Ava Patel',
      points: 980,
      streak: 12,
    },
    {
      userId: createdUsers[1]._id,
      name: 'Marcus Chen',
      points: 945,
      streak: 8,
    },
    {
      userId: createdUsers[2]._id,
      name: 'Nia Brooks',
      points: 912,
      streak: 6,
    },
  ];

  await Promise.all([
    Team.insertMany(teams, { ordered: false }),
    Activity.insertMany(activities, { ordered: false }),
    LeaderboardEntry.insertMany(leaderboardEntries, { ordered: false }),
    Workout.insertMany(workouts, { ordered: false }),
  ]);
}
