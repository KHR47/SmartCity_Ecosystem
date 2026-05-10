/**
 * Seed script - creates one test user for each role.
 * Run once with: npx ts-node src/seed.ts
 *
 * Credentials created:
 *  admin@test.com     / admin123     (admin)
 *  authority@test.com / auth123      (authority)
 *  officer@test.com   / officer123   (officer)
 *  citizen@test.com   / citizen123   (citizen)
 */

import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'asd123',
  database: process.env.DATABASE_NAME || 'smart_city_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

type IdRow = {
  id: number;
};

async function queryRows<T>(
  query: string,
  parameters: unknown[] = [],
): Promise<T[]> {
  const rows = (await AppDataSource.query(query, parameters)) as unknown;
  return rows as T[];
}

const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Authority User',
    email: 'authority@test.com',
    password: 'auth123',
    role: 'authority',
  },
  {
    name: 'Officer User',
    email: 'officer@test.com',
    password: 'officer123',
    role: 'officer',
    badgeNumber: 'B-001',
  },
  {
    name: 'Citizen User',
    email: 'citizen@test.com',
    password: 'citizen123',
    role: 'citizen',
  },
];

// Dynamic location data will be fetched inside the seed function.

const bangladeshiNames = [
  "Abdullah", "Abdur Rahman", "Abu Bakar", "Ahmad", "Ali", "Amin", "Anwar", "Arif", "Asad", "Ashraf",
  "Ayub", "Badrul", "Bashir", "Belal", "Dawood", "Ehsan", "Faisal", "Farooq", "Fazlul", "Firoz",
  "Giasuddin", "Habib", "Hafiz", "Hamid", "Hasan", "Hossain", "Ibrahim", "Idris", "Imran", "Iqbal",
  "Ismail", "Jalal", "Jamal", "Jamil", "Kabir", "Kamal", "Karim", "Kashem", "Kawsar", "Khaled",
  "Latif", "Mahbub", "Mahmud", "Masud", "Mizan", "Momin", "Mubin", "Naim", "Nasir", "Nazrul",
  "Nizam", "Omar", "Osman", "Qasim", "Rafiq", "Rahim", "Rashid", "Riaz", "Sadiq", "Saif",
  "Salim", "Shafiq", "Tariq", "Yusuf"
];

async function seed() {
  await AppDataSource.initialize();
  console.log('✅ Connected to database');

  for (const u of testUsers) {
    const exists = await queryRows<IdRow>(
      `SELECT id FROM users WHERE email = $1`,
      [u.email],
    );

    if (exists.length > 0) {
      console.log(`⚠️  Skipping ${u.email} — already exists`);
      continue;
    }

    const hashed = await bcrypt.hash(u.password, 10);

    await AppDataSource.query(
      `INSERT INTO users (name, email, password, role, "badgeNumber", "isActive")
       VALUES ($1, $2, $3, $4, $5, true)`,
      [u.name, u.email, hashed, u.role, u.badgeNumber ?? null],
    );

    console.log(`✅ Created ${u.role}: ${u.email} / ${u.password}`);
  }

  console.log('Fetching live location data from GitHub...');
  const divsRes = await fetch('https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/divisions/divisions.json');
  const divsJson = await divsRes.json();
  const rawDivisions = divsJson[2].data; 

  const distsRes = await fetch('https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json');
  const distsJson = await distsRes.json();
  const rawDistricts = distsJson[2].data;

  const upzRes = await fetch('https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json');
  const upzJson = await upzRes.json();
  const rawUpazilas = upzJson[2].data;

  console.log(`Fetched ${rawDivisions.length} divisions, ${rawDistricts.length} districts, ${rawUpazilas.length} upazilas`);

  console.log('Seeding locations...');
  for (const divData of rawDivisions) {
    const divisionName = divData.name + " Division";
    let divRes = await queryRows<IdRow>(
      `SELECT id FROM divisions WHERE name = $1`,
      [divisionName],
    );
    let divId: number;
    if (divRes.length === 0) {
      divRes = await queryRows<IdRow>(
        `INSERT INTO divisions (name) VALUES ($1) RETURNING id`,
        [divisionName],
      );
    }
    divId = divRes[0].id;

    const divDistricts = rawDistricts.filter((d: any) => d.division_id === divData.id);
    for (const distData of divDistricts) {
      const districtName = distData.name + " District";
      let distRes = await queryRows<IdRow>(
        `SELECT id FROM districts WHERE name = $1 AND "divisionId" = $2`,
        [districtName, divId],
      );
      let distId: number;
      if (distRes.length === 0) {
        distRes = await queryRows<IdRow>(
          `INSERT INTO districts (name, "divisionId") VALUES ($1, $2) RETURNING id`,
          [districtName, divId],
        );
      }
      distId = distRes[0].id;

      const distUpazilas = rawUpazilas.filter((u: any) => u.district_id === distData.id);
      for (const upzData of distUpazilas) {
        const upazilaName = upzData.name + " Upazila";
        let upzRes = await queryRows<IdRow>(
          `SELECT id FROM upazilas WHERE name = $1 AND "districtId" = $2`,
          [upazilaName, distId],
        );
        let upzId: number;
        if (upzRes.length === 0) {
          upzRes = await queryRows<IdRow>(
            `INSERT INTO upazilas (name, "districtId") VALUES ($1, $2) RETURNING id`,
            [upazilaName, distId],
          );
        }
        upzId = upzRes[0].id;

        // Auto-create a Thana for this Upazila
        const thanaName = upzData.name + " Thana";
        const thanaRes = await queryRows<IdRow>(
          `SELECT id FROM thanas WHERE name = $1 AND "upazilaId" = $2`,
          [thanaName, upzId],
        );
        if (thanaRes.length === 0) {
          await AppDataSource.query(
            `INSERT INTO thanas (name, "upazilaId") VALUES ($1, $2)`,
            [thanaName, upzId],
          );
        }
      }
    }
  }

  console.log('Seeding 64 Citizens and 64 Officers...');
  const allDistricts = await queryRows<{name: string}>(`SELECT name FROM districts`);
  let districtIndex = 0;
  const defaultPass = await bcrypt.hash('123456', 10);
  
  for (const distData of allDistricts) {
    if (districtIndex >= bangladeshiNames.length) break;
    const personName = bangladeshiNames[districtIndex];
    const citizenEmail = `${personName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
    const officerEmail = `officer.${personName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
    const districtName = distData.name.replace(' District', '');

    // Citizen
    const citizenExists = await queryRows<IdRow>(`SELECT id FROM users WHERE email = $1`, [citizenEmail]);
    if (citizenExists.length === 0) {
      await AppDataSource.query(
        `INSERT INTO users (name, email, password, role, district, "isActive") VALUES ($1, $2, $3, $4, $5, true)`,
        [personName, citizenEmail, defaultPass, 'citizen', districtName],
      );
    }

    // Officer
    const officerExists = await queryRows<IdRow>(`SELECT id FROM users WHERE email = $1`, [officerEmail]);
    if (officerExists.length === 0) {
      await AppDataSource.query(
        `INSERT INTO users (name, email, password, role, "badgeNumber", district, "isActive") VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [`Officer ${personName}`, officerEmail, defaultPass, 'officer', `B-DIST-${districtIndex + 1}`, districtName],
      );
    }

    districtIndex++;
  }

  await AppDataSource.destroy();
  console.log('\n🎉 Seeding complete!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
