import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MetersService } from './meters.service';

@Controller('water/meters')
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  @Get()
  findAll() {
    return this.metersService.findAll();
  }

  @Post()
  requestMeter(@Body() data: any) {
    return this.metersService.requestMeter(data);
  }

  @Patch(':id/approve')
  approveMeter(@Param('id') id: string, @Body() data: { hardwareId: string; maxLimit: number }) {
    return this.metersService.approveMeter(id, data.hardwareId, data.maxLimit);
  }

  @Post(':id/readings')
  logReading(@Param('id') id: string, @Body() data: { value: number; recordedBy: string }) {
    return this.metersService.logReading(id, data.value, data.recordedBy);
  }

  @Post(':id/invoice')
  issueInvoice(@Param('id') id: string, @Body() data: { amount: number; breakdown: any }) {
    return this.metersService.issueInvoice(id, data.amount, data.breakdown);
  }

  @Patch(':id/pay')
  payInvoice(@Param('id') id: string) {
    return this.metersService.payInvoice(id);
  }
}
