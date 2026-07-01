"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const database_1 = require("./config/database");
const DEFAULT_PORT = 8000;
const PORT = Number(process.env.PORT || DEFAULT_PORT);
function getApiBaseUrl() {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${DEFAULT_PORT}`;
}
function createApp(dependencies = {}) {
    const app = (0, express_1.default)();
    const userModel = dependencies.userModel || models_1.User;
    const teamModel = dependencies.teamModel || models_1.Team;
    const activityModel = dependencies.activityModel || models_1.Activity;
    const leaderboardModel = dependencies.leaderboardModel || models_1.LeaderboardEntry;
    const workoutModel = dependencies.workoutModel || models_1.Workout;
    app.use(express_1.default.json());
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
async function startServer() {
    try {
        const app = createApp();
        await (0, database_1.connectToDatabase)(database_1.MONGO_URI);
        console.log('Connected to MongoDB at', database_1.MONGO_URI);
        const userCount = await models_1.User.countDocuments();
        if (userCount === 0) {
            await (0, models_1.seedDatabase)();
            console.log('Seeded the octofit_db database with test data');
        }
        app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
            console.log(`API base URL: ${getApiBaseUrl()}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
if (require.main === module) {
    startServer();
}
exports.app = createApp();
