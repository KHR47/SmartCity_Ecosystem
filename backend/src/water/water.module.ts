import { Module } from '@nestjs/common';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';
import { LeaksController } from './leaks.controller';
import { LeaksService } from './leaks.service';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  controllers: [MetersController, LeaksController, BillingController],
  providers: [MetersService, LeaksService, BillingService]
})
export class WaterModule {}
