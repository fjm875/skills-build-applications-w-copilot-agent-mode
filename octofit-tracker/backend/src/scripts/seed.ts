import { connectToDatabase, seedDatabase } from '../models';

async function main(): Promise<void> {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase('mongodb://127.0.0.1:27017/octofit_db');
  await seedDatabase();
  console.log('Database seeded successfully');
}

main().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
