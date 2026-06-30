"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function main() {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await (0, models_1.connectToDatabase)('mongodb://127.0.0.1:27017/octofit_db');
    await (0, models_1.seedDatabase)();
    console.log('Database seeded successfully');
}
main().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
