import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingSlot, SlotStatus, SlotType } from './entities/parking-slot.entity';
import { Booking, BookingStatus, PaymentStatus } from './entities/booking.entity';
import { Violation, ViolationStatus, ViolationType } from './entities/violation.entity';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingLot)
    private lotRepo: Repository<ParkingLot>,
    @InjectRepository(ParkingSlot)
    private slotRepo: Repository<ParkingSlot>,
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Violation)
    private violationRepo: Repository<Violation>,
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
  ) {}

  // ─── LOT MANAGEMENT ──────────────────────────────────────────────────────────

  async findAllLots() {
    return this.lotRepo.find({ where: { isActive: true }, order: { createdAt: 'DESC' } });
  }

  async findAllLotsAdmin() {
    return this.lotRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findLotById(id: number) {
    const lot = await this.lotRepo.findOne({ where: { id }, relations: ['slots'] });
    if (!lot) throw new NotFoundException('Parking lot not found');
    return lot;
  }

  async createLot(data: any) {
    const lot = this.lotRepo.create({ ...data, isActive: true });
    return this.lotRepo.save(lot);
  }

  async updateLot(id: number, data: any) {
    const lot = await this.lotRepo.findOne({ where: { id } });
    if (!lot) throw new NotFoundException('Parking lot not found');
    Object.assign(lot, data);
    return this.lotRepo.save(lot);
  }

  async deleteLot(id: number) {
    const lot = await this.lotRepo.findOne({ where: { id } });
    if (!lot) throw new NotFoundException('Parking lot not found');
    await this.lotRepo.remove(lot);
    return { message: 'Lot deleted successfully' };
  }

  // ─── SLOT MANAGEMENT ─────────────────────────────────────────────────────────

  async findSlotsByLot(lotId: number) {
    return this.slotRepo.find({
      where: { parkingLot: { id: lotId } },
      order: { slotNumber: 'ASC' },
    });
  }

  async findSlotById(id: number) {
    const slot = await this.slotRepo.findOne({
      where: { id },
      relations: ['parkingLot'],
    });
    if (!slot) throw new NotFoundException('Slot not found');
    return slot;
  }

  async createSlot(lotId: number, data: any) {
    const lot = await this.lotRepo.findOne({ where: { id: lotId } });
    if (!lot) throw new NotFoundException('Parking lot not found');
    const slot = this.slotRepo.create({ ...data, parkingLot: lot });
    const saved = await this.slotRepo.save(slot);
    await this.syncLotSlotCounts(lotId);
    return saved;
  }

  async bulkCreateSlots(lotId: number, data: { count: number; floor: string; zone: string; type: SlotType }) {
    const lot = await this.lotRepo.findOne({ where: { id: lotId } });
    if (!lot) throw new NotFoundException('Parking lot not found');

    const prefix = data.floor ? `${data.floor}-` : '';
    const slots = Array.from({ length: data.count }, (_, i) =>
      this.slotRepo.create({
        slotNumber: `${prefix}${data.zone}${String(i + 1).padStart(2, '0')}`,
        floor: data.floor,
        zone: data.zone,
        type: data.type || SlotType.CAR,
        status: SlotStatus.AVAILABLE,
        parkingLot: lot,
      }),
    );

    const saved = await this.slotRepo.save(slots);
    await this.syncLotSlotCounts(lotId);
    return saved;
  }

  async updateSlotStatus(slotId: number, status: SlotStatus) {
    const slot = await this.slotRepo.findOne({ where: { id: slotId }, relations: ['parkingLot'] });
    if (!slot) throw new NotFoundException('Slot not found');
    slot.status = status;
    await this.slotRepo.save(slot);
    await this.syncLotSlotCounts(slot.parkingLot.id);
    return slot;
  }

  async deleteSlot(slotId: number) {
    const slot = await this.slotRepo.findOne({ where: { id: slotId }, relations: ['parkingLot'] });
    if (!slot) throw new NotFoundException('Slot not found');
    const lotId = slot.parkingLot.id;
    await this.slotRepo.remove(slot);
    await this.syncLotSlotCounts(lotId);
    return { message: 'Slot deleted' };
  }

  private async syncLotSlotCounts(lotId: number) {
    const totalSlots = await this.slotRepo.count({ where: { parkingLot: { id: lotId } } });
    const availableSlots = await this.slotRepo.count({
      where: { parkingLot: { id: lotId }, status: SlotStatus.AVAILABLE },
    });
    await this.lotRepo.update(lotId, { totalSlots, availableSlots });
  }

  // ─── BOOKING ─────────────────────────────────────────────────────────────────

  async createBooking(userId: number, data: any) {
    const slotId = Number(data.slotId);
    const slot = await this.slotRepo.findOne({
      where: { id: slotId },
      relations: ['parkingLot'],
    });
    if (!slot || slot.status !== SlotStatus.AVAILABLE) {
      throw new BadRequestException('Slot not available');
    }

    const booking = this.bookingRepo.create({
      user: { id: userId },
      parkingSlot: { id: slotId },
      vehicle: data.vehicleId ? { id: Number(data.vehicleId) } : undefined,
      vehicleNumber: data.vehicleNumber,
      startTime: data.startTime || new Date(),
      endTime: data.endTime || null,
      notes: data.notes || null,
      status: BookingStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
    });

    slot.status = SlotStatus.RESERVED;
    await this.slotRepo.save(slot);
    await this.syncLotSlotCounts(slot.parkingLot.id);

    return this.bookingRepo.save(booking);
  }

  async getUserBookings(userId: number) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['parkingSlot', 'parkingSlot.parkingLot', 'vehicle'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllBookings() {
    return this.bookingRepo.find({
      relations: ['user', 'parkingSlot', 'parkingSlot.parkingLot', 'vehicle'],
      order: { createdAt: 'DESC' },
    });
  }

  async getBookingById(id: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['user', 'parkingSlot', 'parkingSlot.parkingLot', 'vehicle'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async cancelBooking(bookingId: number, userId?: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['parkingSlot', 'parkingSlot.parkingLot', 'user'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (userId && booking.user.id !== userId) throw new BadRequestException('Not authorized');
    if (booking.status === BookingStatus.ACTIVE) throw new BadRequestException('Cannot cancel active booking');

    booking.status = BookingStatus.CANCELLED;
    booking.parkingSlot.status = SlotStatus.AVAILABLE;
    await this.slotRepo.save(booking.parkingSlot);
    await this.syncLotSlotCounts(booking.parkingSlot.parkingLot.id);
    return this.bookingRepo.save(booking);
  }

  async checkIn(bookingId: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['parkingSlot', 'parkingSlot.parkingLot'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status !== BookingStatus.PENDING) throw new BadRequestException('Booking cannot be checked in');

    booking.actualCheckIn = new Date();
    booking.status = BookingStatus.ACTIVE;
    booking.parkingSlot.status = SlotStatus.OCCUPIED;

    await this.slotRepo.save(booking.parkingSlot);
    await this.syncLotSlotCounts(booking.parkingSlot.parkingLot.id);
    return this.bookingRepo.save(booking);
  }

  async checkOut(bookingId: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['parkingSlot', 'parkingSlot.parkingLot'],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.actualCheckOut = new Date();
    booking.status = BookingStatus.COMPLETED;
    booking.parkingSlot.status = SlotStatus.AVAILABLE;

    const checkInTime = booking.actualCheckIn || booking.startTime;
    const hours = Math.max(1, Math.ceil((booking.actualCheckOut.getTime() - new Date(checkInTime).getTime()) / (1000 * 60 * 60)));
    booking.totalFee = hours * Number(booking.parkingSlot.parkingLot.hourlyRate);

    await this.slotRepo.save(booking.parkingSlot);
    await this.syncLotSlotCounts(booking.parkingSlot.parkingLot.id);
    return this.bookingRepo.save(booking);
  }

  async payBooking(bookingId: number, userId: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, user: { id: userId } },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.paymentStatus === PaymentStatus.PAID) throw new BadRequestException('Already paid');

    booking.paymentStatus = PaymentStatus.PAID;
    booking.isPaid = true;
    return this.bookingRepo.save(booking);
  }

  // ─── VEHICLES ─────────────────────────────────────────────────────────────────

  async getUserVehicles(userId: number) {
    return this.vehicleRepo.find({
      where: { user: { id: userId }, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async registerVehicle(userId: number, data: any) {
    const vehicle = this.vehicleRepo.create({ ...data, user: { id: userId } });
    return this.vehicleRepo.save(vehicle);
  }

  async deleteVehicle(vehicleId: number, userId: number) {
    const vehicle = await this.vehicleRepo.findOne({ where: { id: vehicleId, user: { id: userId } } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    vehicle.isActive = false;
    return this.vehicleRepo.save(vehicle);
  }

  // ─── VIOLATIONS ──────────────────────────────────────────────────────────────

  async getUserViolations(userId: number) {
    return this.violationRepo.find({
      where: { user: { id: userId } },
      relations: ['parkingLot'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllViolations() {
    return this.violationRepo.find({
      relations: ['user', 'parkingLot', 'issuedBy', 'booking'],
      order: { createdAt: 'DESC' },
    });
  }

  async createViolation(issuedById: number, data: any) {
    const violation = this.violationRepo.create({
      ...data,
      issuedBy: { id: issuedById },
      user: data.userId ? { id: data.userId } : null,
      parkingLot: data.lotId ? { id: data.lotId } : null,
      booking: data.bookingId ? { id: data.bookingId } : null,
      status: ViolationStatus.ISSUED,
    });
    return this.violationRepo.save(violation);
  }

  async resolveViolation(violationId: number, data: { status: ViolationStatus; notes?: string }) {
    const violation = await this.violationRepo.findOne({ where: { id: violationId } });
    if (!violation) throw new NotFoundException('Violation not found');
    violation.status = data.status;
    if (data.notes) violation.resolutionNotes = data.notes;
    return this.violationRepo.save(violation);
  }

  async payViolation(violationId: number, userId: number) {
    const violation = await this.violationRepo.findOne({
      where: { id: violationId, user: { id: userId } },
    });
    if (!violation) throw new NotFoundException('Violation not found');
    if (violation.status === ViolationStatus.PAID) throw new BadRequestException('Already paid');
    violation.status = ViolationStatus.PAID;
    return this.violationRepo.save(violation);
  }

  // ─── ANALYTICS ───────────────────────────────────────────────────────────────

  async getOperatorAnalytics() {
    const totalLots = await this.lotRepo.count();
    const activeLots = await this.lotRepo.count({ where: { isActive: true } });
    const totalSlots = await this.slotRepo.count();
    const occupiedSlots = await this.slotRepo.count({ where: { status: SlotStatus.OCCUPIED } });
    const reservedSlots = await this.slotRepo.count({ where: { status: SlotStatus.RESERVED } });
    const availableSlots = await this.slotRepo.count({ where: { status: SlotStatus.AVAILABLE } });
    const totalBookings = await this.bookingRepo.count();
    const activeBookings = await this.bookingRepo.count({ where: { status: BookingStatus.ACTIVE } });
    const pendingBookings = await this.bookingRepo.count({ where: { status: BookingStatus.PENDING } });
    const completedBookings = await this.bookingRepo.count({ where: { status: BookingStatus.COMPLETED } });
    const totalRevenue = await this.bookingRepo.sum('totalFee', { status: BookingStatus.COMPLETED, isPaid: true }) || 0;
    const totalViolations = await this.violationRepo.count();
    const pendingViolations = await this.violationRepo.count({ where: { status: ViolationStatus.ISSUED } });
    const violationRevenue = await this.violationRepo.sum('fineAmount', { status: ViolationStatus.PAID }) || 0;

    return {
      totalLots,
      activeLots,
      totalSlots,
      occupiedSlots,
      reservedSlots,
      availableSlots,
      occupancyRate: totalSlots > 0 ? Math.round(((occupiedSlots + reservedSlots) / totalSlots) * 100) : 0,
      totalBookings,
      activeBookings,
      pendingBookings,
      completedBookings,
      totalRevenue: Number(totalRevenue),
      totalViolations,
      pendingViolations,
      violationRevenue: Number(violationRevenue),
    };
  }

  async getAttendantActiveBookings() {
    return this.bookingRepo.find({
      where: [{ status: BookingStatus.PENDING }, { status: BookingStatus.ACTIVE }],
      relations: ['user', 'parkingSlot', 'parkingSlot.parkingLot', 'vehicle'],
      order: { createdAt: 'DESC' },
    });
  }

  async getPaymentSummary() {
    const paidBookings = await this.bookingRepo.find({
      where: { paymentStatus: PaymentStatus.PAID },
      relations: ['user', 'parkingSlot', 'parkingSlot.parkingLot'],
      order: { updatedAt: 'DESC' },
    });
    const totalRevenue = await this.bookingRepo.sum('totalFee', { paymentStatus: PaymentStatus.PAID }) || 0;
    const unpaidCount = await this.bookingRepo.count({ where: { status: BookingStatus.COMPLETED, paymentStatus: PaymentStatus.UNPAID } });
    return { paidBookings, totalRevenue: Number(totalRevenue), unpaidCount };
  }
}
