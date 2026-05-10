import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Division } from './entities/division.entity';
import { District } from './entities/district.entity';
import { Upazila } from './entities/upazila.entity';
import { Thana } from './entities/thana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division, District, Upazila, Thana])],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
