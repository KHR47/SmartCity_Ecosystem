import { Global, Module } from '@nestjs/common';
import { ReportsGateway } from './reports.gateway';

@Global()
@Module({
  providers: [ReportsGateway],
  exports: [ReportsGateway],
})
export class GatewayModule {}
