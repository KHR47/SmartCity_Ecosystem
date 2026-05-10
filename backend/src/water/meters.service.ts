import { Injectable } from '@nestjs/common';

@Injectable()
export class MetersService {
  private meters: any[] = [
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
    }
  ];

  findAll() {
    return this.meters;
  }

  requestMeter(data: any) {
    const newMeter = {
      id: `REQ-${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      lastReading: 0,
      readings: [],
      pendingInvoice: null,
      invoiceHistory: [],
      ...data,
    };
    this.meters.unshift(newMeter);
    return newMeter;
  }

  approveMeter(id: string, hardwareId: string, maxLimit: number) {
    const meter = this.meters.find(m => m.id === id);
    if (meter) {
      meter.id = hardwareId.toUpperCase();
      meter.status = "active";
      meter.maxLimit = maxLimit;
    }
    return meter;
  }

  logReading(id: string, value: number, recordedBy: string) {
    const meter = this.meters.find(m => m.id === id);
    if (meter) {
      meter.lastReading = value;
      meter.readings.unshift({
        id: `R-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split("T")[0],
        value,
        recordedBy
      });
    }
    return meter;
  }

  issueInvoice(id: string, amount: number, breakdown: any) {
    const meter = this.meters.find(m => m.id === id);
    if (meter) {
      meter.pendingInvoice = {
        id: `INV-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split("T")[0],
        amount,
        breakdown,
        status: "unpaid"
      };
    }
    return meter;
  }

  payInvoice(id: string) {
    const meter = this.meters.find(m => m.id === id);
    if (meter && meter.pendingInvoice) {
      meter.pendingInvoice.status = "paid";
      meter.invoiceHistory.unshift(meter.pendingInvoice);
      meter.pendingInvoice = null;
      // Reset reading for next cycle
      meter.lastReading = 0;
      meter.readings = [];
    }
    return meter;
  }
}
