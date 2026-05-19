import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Usage: npx ts-node scripts/database/merge-duplicate-divisions.ts
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'asd123',
  database: process.env.DATABASE_NAME || 'smart_city_db',
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  synchronize: false,
});

async function run() {
  await AppDataSource.initialize();
  
  // Reassign districts from Chattagram (9) to Chattogram (2)
  console.log("Reassigning districts from Chattagram to Chattogram...");
  await AppDataSource.query(`UPDATE districts SET "divisionId" = 2 WHERE "divisionId" = 9`);
  
  // Reassign districts from Barisal (10) to Barishal (6)
  console.log("Reassigning districts from Barisal to Barishal...");
  await AppDataSource.query(`UPDATE districts SET "divisionId" = 6 WHERE "divisionId" = 10`);

  // Delete duplicates
  console.log("Deleting duplicate divisions (9, 10)...");
  await AppDataSource.query(`DELETE FROM divisions WHERE id IN (9, 10)`);
  
  const res = await AppDataSource.query(`SELECT id, name FROM divisions ORDER BY id`);
  console.log("Remaining divisions:", res);
  process.exit(0);
}
run();
