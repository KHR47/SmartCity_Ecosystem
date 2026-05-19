import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Usage: npx ts-node scripts/database/merge-renamed-districts.ts
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
  
  const replacements = [
    { keep: 10, del: 80 }, // Barishal vs Barisal
    { keep: 26, del: 65 }, // Cumilla vs Comilla
    { keep: 5, del: 73 },  // Cox's Bazar vs Coxsbazar
    { keep: 76, del: 7 },  // Jashore vs Jessore
    { keep: 53, del: 77 }, // Jhalokathi vs Jhalakathi
  ];
  
  for (const r of replacements) {
    console.log(`Keeping ${r.keep}, deleting ${r.del}`);
    await AppDataSource.query(`UPDATE upazilas SET "districtId" = $1 WHERE "districtId" = $2`, [r.keep, r.del]);
    await AppDataSource.query(`DELETE FROM districts WHERE id = $1`, [r.del]);
  }

  const finalCount = await AppDataSource.query(`SELECT COUNT(*) as count FROM districts`);
  console.log(`Final total districts: ${finalCount[0].count}`);
  
  process.exit(0);
}
run();
