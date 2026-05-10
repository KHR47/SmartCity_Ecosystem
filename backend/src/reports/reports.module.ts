import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { Division } from '../locations/entities/division.entity';
import { District } from '../locations/entities/district.entity';
import { Upazila } from '../locations/entities/upazila.entity';
import { Thana } from '../locations/entities/thana.entity';
import { Comment } from './entities/comment.entity';
import { Report } from './entities/report.entity';
import { StatusHistory } from './entities/status-history.entity';
import { ReportSupport } from './entities/report-support.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report,
      Division,
      District,
      Upazila,
      Thana,
      Category,
      User,
      Comment,
      StatusHistory,
      ReportSupport,
    ]),
    NotificationsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
