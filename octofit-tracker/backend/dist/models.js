"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
exports.connectToDatabase = connectToDatabase;
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    weeklyTarget: { type: Number, required: true },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    focus: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
}, { timestamps: true });
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.models.Team || mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', workoutSchema);
async function connectToDatabase(uri = 'mongodb://127.0.0.1:27017/octofit_db') {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    await mongoose_1.default.connect(uri);
}
async function seedDatabase() {
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
        exports.Team.deleteMany({}),
        exports.Activity.deleteMany({}),
        exports.LeaderboardEntry.deleteMany({}),
        exports.Workout.deleteMany({}),
        exports.User.deleteMany({}),
    ]);
    const createdUsers = await exports.User.insertMany(users, { ordered: false });
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
        exports.Team.insertMany(teams, { ordered: false }),
        exports.Activity.insertMany(activities, { ordered: false }),
        exports.LeaderboardEntry.insertMany(leaderboardEntries, { ordered: false }),
        exports.Workout.insertMany(workouts, { ordered: false }),
    ]);
}
