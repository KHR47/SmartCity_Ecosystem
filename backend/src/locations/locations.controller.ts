import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('divisions')
  findAllDivisions() {
    return this.locationsService.findAllDivisions();
  }

  @Get('divisions/:id/districts')
  findDistrictsByDivision(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.findDistrictsByDivision(id);
  }

  @Get('districts/:id/upazilas')
  findUpazilasByDistrict(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.findUpazilasByDistrict(id);
  }

  @Get('upazilas/:id/thanas')
  findThanasByUpazila(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.findThanasByUpazila(id);
  }

  @Get('districts')
  findAllDistricts() {
    return this.locationsService.findAllDistricts();
  }

  @Post('districts')
  createDistrict(@Body() body: { name: string; divisionId: number }) {
    return this.locationsService.createDistrict(body);
  }

  @Patch('districts/:id')
  updateDistrict(@Param('id', ParseIntPipe) id: number, @Body() body: { name?: string; divisionId?: number }) {
    return this.locationsService.updateDistrict(id, body);
  }

  @Delete('districts/:id')
  deleteDistrict(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.deleteDistrict(id);
  }
}
