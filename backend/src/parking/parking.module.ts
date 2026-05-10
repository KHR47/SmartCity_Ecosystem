import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingSlot } from './entities/parking-slot.entity';
import { Booking } from './entities/booking.entity';
import { Violation } from './entities/violation.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingLot, ParkingSlot, Booking, Violation, Vehicle]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
  exports: [ParkingService],
})
export class ParkingModule {}
