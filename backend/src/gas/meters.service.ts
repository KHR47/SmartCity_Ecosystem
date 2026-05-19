import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GasMeter } from './entities/gas-meter.entity';

@Injectable()
export class MetersService {
  constructor(
    @InjectRepository(GasMeter)
    private readonly gasMeterRepository: Repository<GasMeter>,
  ) {}

  async findAll() {
    return this.gasMeterRepository.find();
  }

  async requestMeter(data: any) {
    const citizenNameLower = data.citizenName?.trim().toLowerCase();
    if (citizenNameLower) {
      const allMeters = await this.gasMeterRepository.find();
      const userMeters = allMeters.filter(
        (m) => m.citizenName?.trim().toLowerCase() === citizenNameLower
      );
      if (userMeters.length >= 5) {
        throw new BadRequestException("You cannot have more than 5 meters for this service.");
      }
    }

    const newMeter = this.gasMeterRepository.create({
      id: `REQ-G-${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      lastReading: 0,
      readings: [],
      pendingInvoice: null,
      invoiceHistory: [],
      ...data,
    });
    return this.gasMeterRepository.save(newMeter);
  }

  async approveMeter(id: string, hardwareId: string, maxLimit: number) {
    const meter = await this.gasMeterRepository.findOne({ where: { id } });
    if (meter) {
      await this.gasMeterRepository.delete(id);
      const activeMeter = this.gasMeterRepository.create({
        ...meter,
        id: hardwareId.toUpperCase(),
        status: "active",
        maxLimit,
      });
      return this.gasMeterRepository.save(activeMeter);
    }
    return null;
  }

  async logReading(id: string, value: number, recordedBy: string) {
    const meter = await this.gasMeterRepository.findOne({ where: { id } });
    if (meter) {
      meter.lastReading = value;
      if (!meter.readings) {
        meter.readings = [];
      }
      meter.readings = [
        {
          id: `R-${Math.floor(Math.random() * 10000)}`,
          date: new Date().toISOString().split("T")[0],
          value,
          recordedBy
        },
        ...meter.readings
      ];
      return this.gasMeterRepository.save(meter);
    }
    return null;
  }

  async issueInvoice(id: string, amount: number, breakdown: any) {
    const meter = await this.gasMeterRepository.findOne({ where: { id } });
    if (meter) {
      meter.pendingInvoice = {
        id: `INV-G-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split("T")[0],
        amount,
        breakdown,
        status: "unpaid"
      };
      return this.gasMeterRepository.save(meter);
    }
    return null;
  }

  async payInvoice(id: string) {
    const meter = await this.gasMeterRepository.findOne({ where: { id } });
    if (meter && meter.pendingInvoice) {
      meter.pendingInvoice.status = "paid";
      if (!meter.invoiceHistory) {
        meter.invoiceHistory = [];
      }
      meter.invoiceHistory = [
        meter.pendingInvoice,
        ...meter.invoiceHistory
      ];
      meter.pendingInvoice = null;
      meter.lastReading = 0;
      return this.gasMeterRepository.save(meter);
    }
    return null;
  }
}
