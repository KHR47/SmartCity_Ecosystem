import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectricityMeter } from './entities/electricity-meter.entity';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

@Module({
  imports: [TypeOrmModule.forFeature([ElectricityMeter])],
  controllers: [MetersController],
  providers: [MetersService],
})
export class ElectricityModule {}
