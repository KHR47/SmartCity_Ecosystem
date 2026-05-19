import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaterMeter } from './entities/water-meter.entity';

@Injectable()
export class MetersService implements OnModuleInit {
  constructor(
    @InjectRepository(WaterMeter)
    private readonly waterMeterRepository: Repository<WaterMeter>,
  ) {}

  async onModuleInit() {
    const count = await this.waterMeterRepository.count();
    if (count === 0) {
      const initialMeters = [
        {
          id: "REQ-9942",
          citizenName: "Rahim Uddin",
          zone: "Mirpur",
          type: "residential",
          status: "pending",
          address: "Block C, Road 2, House 14",
          lastReading: 0,
          readings: [],
          pendingInvoice: null,
          invoiceHistory: []
        },
        {
          id: "WM-GUL-001",
          citizenName: "Karim Hassan",
          zone: "Gulshan",
          type: "residential",
          status: "active",
          address: "Road 12, House 4B",
          lastReading: 1250,
          maxLimit: 2000,
          readings: [
            { id: "R1", date: "2026-03-01", value: 1250, recordedBy: "Auto" },
            { id: "R2", date: "2026-02-01", value: 1120, recordedBy: "Auto" },
          ],
          pendingInvoice: null,
          invoiceHistory: []
        },
        {
          id: "WM-BAN-012",
          citizenName: "Anisur Rahman",
          zone: "Banani",
          type: "commercial",
          status: "active",
          address: "Road 11, Block F",
          lastReading: 940,
          maxLimit: 5000,
          readings: [
            { id: "R4", date: "2026-03-01", value: 940, recordedBy: "Auto" }
          ]
        }
      ];
      await this.waterMeterRepository.save(initialMeters);
    }
  }

  async findAll() {
    return this.waterMeterRepository.find();
  }

  async requestMeter(data: any) {
    const citizenNameLower = data.citizenName?.trim().toLowerCase();
    if (citizenNameLower) {
      const allMeters = await this.waterMeterRepository.find();
      const userMeters = allMeters.filter(
        (m) => m.citizenName?.trim().toLowerCase() === citizenNameLower
      );
      if (userMeters.length >= 5) {
        throw new BadRequestException("You cannot have more than 5 meters for this service.");
      }
    }

    const newMeter = this.waterMeterRepository.create({
      id: `REQ-${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      lastReading: 0,
      readings: [],
      pendingInvoice: null,
      invoiceHistory: [],
      ...data,
    });
    return this.waterMeterRepository.save(newMeter);
  }

  async approveMeter(id: string, hardwareId: string, maxLimit: number) {
    const meter = await this.waterMeterRepository.findOne({ where: { id } });
    if (meter) {
      // Since changing primary key is not straightforward, we delete and recreate.
      await this.waterMeterRepository.delete(id);
      const activeMeter = this.waterMeterRepository.create({
        ...meter,
        id: hardwareId.toUpperCase(),
        status: "active",
        maxLimit,
      });
      return this.waterMeterRepository.save(activeMeter);
    }
    return null;
  }

  async logReading(id: string, value: number, recordedBy: string) {
    const meter = await this.waterMeterRepository.findOne({ where: { id } });
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
      return this.waterMeterRepository.save(meter);
    }
    return null;
  }

  async issueInvoice(id: string, amount: number, breakdown: any) {
    const meter = await this.waterMeterRepository.findOne({ where: { id } });
    if (meter) {
      meter.pendingInvoice = {
        id: `INV-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split("T")[0],
        amount,
        breakdown,
        status: "unpaid"
      };
      return this.waterMeterRepository.save(meter);
    }
    return null;
  }

  async payInvoice(id: string) {
    const meter = await this.waterMeterRepository.findOne({ where: { id } });
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
      // Reset reading for next cycle
      meter.lastReading = 0;
      return this.waterMeterRepository.save(meter);
    }
    return null;
  }
}
