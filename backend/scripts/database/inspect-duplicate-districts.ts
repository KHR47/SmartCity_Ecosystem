import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Usage: npx ts-node scripts/database/inspect-duplicate-districts.ts
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
  const res = await AppDataSource.query(`
    SELECT name, COUNT(*) as count 
    FROM districts 
    GROUP BY name 
    HAVING COUNT(*) > 1 
    ORDER BY count DESC
  `);
  console.log("Duplicate District Names:", res);

  const all = await AppDataSource.query(`SELECT id, name, "divisionId" FROM districts ORDER BY name`);
  console.log("Total districts in db:", all.length);

  process.exit(0);
}
run();
