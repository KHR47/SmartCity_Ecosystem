import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Usage: npx ts-node scripts/database/merge-duplicate-districts.ts
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
  
  // Find duplicates
  const dups = await AppDataSource.query(`
    SELECT name 
    FROM districts 
    GROUP BY name 
    HAVING COUNT(*) > 1 
  `);
  
  console.log(`Found ${dups.length} duplicate district names.`);
  
  for (const dup of dups) {
    const districts = await AppDataSource.query(`SELECT id FROM districts WHERE name = $1 ORDER BY id`, [dup.name]);
    
    if (districts.length > 1) {
      const keepId = districts[0].id;
      const deleteIds = districts.slice(1).map((d: any) => d.id);
      
      console.log(`Fixing ${dup.name}: keeping ${keepId}, deleting ${deleteIds.join(', ')}`);
      
      // Move upazilas to keepId
      await AppDataSource.query(`UPDATE upazilas SET "districtId" = $1 WHERE "districtId" = ANY($2)`, [keepId, deleteIds]);
      
      // The users table stores district name as string, so we don't need to update foreign keys there!
      // Delete duplicates
      await AppDataSource.query(`DELETE FROM districts WHERE id = ANY($1)`, [deleteIds]);
    }
  }

  const finalCount = await AppDataSource.query(`SELECT COUNT(*) as count FROM districts`);
  console.log(`Final total districts: ${finalCount[0].count}`);
  
  process.exit(0);
}
run();
