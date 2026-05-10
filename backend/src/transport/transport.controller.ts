import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transport: TransportService) {}

  // Routes
  @Get('routes') getRoutes() { return this.transport.getRoutes(); }
  @Get('routes/:id') getRoute(@Param('id') id: string) { return this.transport.getRoute(id); }
  @Post('routes') addRoute(@Body() body: any) { return this.transport.addRoute(body); }
  @Patch('routes/:id') updateRoute(@Param('id') id: string, @Body() body: any) { return this.transport.updateRoute(id, body); }
  @Delete('routes/:id') deleteRoute(@Param('id') id: string) { return this.transport.deleteRoute(id); }

  // Vehicles
  @Get('vehicles') getVehicles() { return this.transport.getVehicles(); }
  @Post('vehicles') addVehicle(@Body() body: any) { return this.transport.addVehicle(body); }
  @Patch('vehicles/:id') updateVehicle(@Param('id') id: string, @Body() body: any) { return this.transport.updateVehicle(id, body); }
  @Patch('vehicles/:id/location') updateLocation(@Param('id') id: string, @Body() body: { lat: number; lng: number }) { return this.transport.updateLocation(id, body.lat, body.lng); }
  @Delete('vehicles/:id') removeVehicle(@Param('id') id: string) { return this.transport.removeVehicle(id); }

  // Schedules
  @Get('schedules') getSchedules(@Query('routeId') routeId?: string) { return this.transport.getSchedules(routeId); }
  @Post('schedules') addSchedule(@Body() body: any) { return this.transport.addSchedule(body); }
  @Patch('schedules/:id') updateSchedule(@Param('id') id: string, @Body() body: any) { return this.transport.updateSchedule(id, body); }
  @Delete('schedules/:id') deleteSchedule(@Param('id') id: string) { return this.transport.deleteSchedule(id); }

  // Tickets
  @Get('tickets') getTickets(@Query('passenger') passenger?: string) { return this.transport.getTickets(passenger); }
  @Post('tickets') buyTicket(@Body() body: any) { return this.transport.buyTicket(body); }
  @Post('tickets/validate') validateTicket(@Body() body: { id: string }) { return this.transport.validateTicket(body.id); }
  @Post('tickets/expire') expireOldTickets() { return this.transport.expireOldTickets(); }

  // Disruptions
  @Get('disruptions') getDisruptions(@Query('status') status?: string) { return this.transport.getDisruptions(status); }
  @Post('disruptions') addDisruption(@Body() body: any) { return this.transport.addDisruption(body); }
  @Patch('disruptions/:id/resolve') resolveDisruption(@Param('id') id: string) { return this.transport.resolveDisruption(id); }
  @Post('disruptions/auto-resolve') autoResolve() { return this.transport.autoResolveOldDisruptions(); }

  // Feedback
  @Get('feedback') getFeedback() { return this.transport.getFeedbacks(); }
  @Post('feedback') addFeedback(@Body() body: any) { return this.transport.addFeedback(body); }

  // Analytics & Planner
  @Get('analytics') getAnalytics() { return this.transport.getAnalytics(); }
  @Get('plan') planTrip(@Query('from') from: string, @Query('to') to: string) { return this.transport.planTrip(from, to); }

  // Intercity Routes
  @Get('intercity') getIntercityRoutes(@Query('division') division?: string) { return this.transport.getIntercityRoutes(division); }
  @Get('intercity/plan') planIntercityTrip(@Query('from') from: string, @Query('to') to: string) { return this.transport.planIntercityTrip(from, to); }
  @Get('intercity/:id') getIntercityRoute(@Param('id') id: string) { return this.transport.getIntercityRoute(id); }
  @Post('intercity') addIntercityRoute(@Body() body: any) { return this.transport.addIntercityRoute(body); }
  @Patch('intercity/:id') updateIntercityRoute(@Param('id') id: string, @Body() body: any) { return this.transport.updateIntercityRoute(id, body); }
  @Delete('intercity/:id') deleteIntercityRoute(@Param('id') id: string) { return this.transport.deleteIntercityRoute(id); }
}
