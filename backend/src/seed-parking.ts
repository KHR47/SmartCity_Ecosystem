import { DataSource } from 'typeorm';
import { ParkingLot } from './parking/entities/parking-lot.entity';
import { ParkingSlot, SlotStatus } from './parking/entities/parking-slot.entity';
import { User } from './users/entities/user.entity';
import { Role } from './common/enums/role.enum';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'asd123',
  database: process.env.DATABASE_NAME || 'smart_city_db',
  entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: true,
});

async function seedParking() {
  await AppDataSource.initialize();
  console.log('✅ Connected to database');

  const lotRepo = AppDataSource.getRepository(ParkingLot);
  const slotRepo = AppDataSource.getRepository(ParkingSlot);
  const userRepo = AppDataSource.getRepository(User);

  // 1. Create Attendant User
  const attendantEmail = 'parking@test.com';
  let attendant = await userRepo.findOne({ where: { email: attendantEmail } });
  
  if (!attendant) {
    const hashed = await bcrypt.hash('park123', 10);
    attendant = await userRepo.save(userRepo.create({
      name: 'Parking Attendant',
      email: attendantEmail,
      password: hashed,
      role: Role.ATTENDANT,
      isActive: true
    }));
    console.log(`✅ Created attendant: ${attendantEmail} / park123`);
  } else {
    console.log(`⚠️  Attendant ${attendantEmail} already exists`);
  }

  // 2. Create Parking Lots
  const lotsData = [
    { name: 'Banani Square Parking', location: 'Road 11, Banani, Dhaka', hourlyRate: 100, peakRate: 150, totalSlots: 50, availableSlots: 50, isActive: true },
    { name: 'Gulshan 2 Public Parking', location: 'Gulshan 2 Circle, Dhaka', hourlyRate: 120, peakRate: 180, totalSlots: 80, availableSlots: 80, isActive: true },
    { name: 'Dhanmondi Lake Parking', location: 'Road 32, Dhanmondi, Dhaka', hourlyRate: 80, peakRate: 120, totalSlots: 40, availableSlots: 40, isActive: true },
  ];

  for (const lotData of lotsData) {
    let lot = await lotRepo.findOne({ where: { name: lotData.name } });
    if (!lot) {
      lot = await lotRepo.save(lotRepo.create(lotData));
      console.log(`✅ Created lot: ${lot.name}`);

      const slots: ParkingSlot[] = [];
      for (let i = 1; i <= lot.totalSlots; i++) {
        slots.push(slotRepo.create({
          slotNumber: `${String.fromCharCode(65 + Math.floor((i-1)/10))}${((i-1) % 10) + 1}`,
          floor: i <= 20 ? 'G' : i <= 40 ? '1' : '2',
          zone: i % 2 === 0 ? 'Blue' : 'Green',
          status: Math.random() > 0.8 ? SlotStatus.OCCUPIED : SlotStatus.AVAILABLE,
          parkingLot: lot
        }));
      }
      await slotRepo.save(slots);
      
      // Update availability
      lot.availableSlots = await slotRepo.count({ where: { parkingLot: { id: lot.id }, status: SlotStatus.AVAILABLE } });
      await lotRepo.save(lot);
    } else {
      console.log(`⚠️  Lot ${lot.name} already exists`);
    }
  }

  await AppDataSource.destroy();
  console.log('\n🎉 Parking seeding complete!');
}

seedParking().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
