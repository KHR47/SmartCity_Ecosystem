import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { SafeUser } from '../common/types/request-with-user.type';
import { User } from '../users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { ReportsGateway } from '../gateway/reports.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly reportsGateway: ReportsGateway,
  ) {}

  async createNotification(
    user: SafeUser | User,
    message: string,
    reportId: number,
  ) {
    const notification = this.notificationsRepository.create({
      user: user as User,
      message,
      reportId,
    });

    const savedNotification =
      await this.notificationsRepository.save(notification);

    // Emit real-time event
    this.reportsGateway.server
      .to(`user_${user.id}`)
      .emit('new_notification', savedNotification);

    return savedNotification;
  }

  findMyNotifications(userId: number) {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number, userId: number) {
    const notification = await this.notificationsRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: number) {
    await this.notificationsRepository.update(
      { user: { id: userId }, isRead: false },
      { isRead: true },
    );
    return { success: true };
  }
}
