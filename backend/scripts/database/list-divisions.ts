import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Usage: npx ts-node scripts/database/list-divisions.ts
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
  const res = await AppDataSource.query(`SELECT id, name FROM divisions ORDER BY id`);
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
run();
