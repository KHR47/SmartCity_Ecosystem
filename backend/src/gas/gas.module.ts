import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasMeter } from './entities/gas-meter.entity';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

@Module({
  imports: [TypeOrmModule.forFeature([GasMeter])],
  controllers: [MetersController],
  providers: [MetersService],
})
export class GasModule {}
