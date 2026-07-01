"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.MONGO_URI = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function connectToDatabase(uri = exports.MONGO_URI) {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default;
    }
    return mongoose_1.default.connect(uri);
}
