import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Report } from './reports/entities/report.entity';
import { Comment } from './reports/entities/comment.entity';
import { StatusHistory } from './reports/entities/status-history.entity';
import { ReportSupport } from './reports/entities/report-support.entity';
import { Notification } from './notifications/entities/notification.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Division } from './locations/entities/division.entity';
import { District } from './locations/entities/district.entity';
import { Upazila } from './locations/entities/upazila.entity';
import { Thana } from './locations/entities/thana.entity';
import { LocationsModule } from './locations/locations.module';
import { GatewayModule } from './gateway/gateway.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Zone } from './zones/entities/zone.entity';
import { ZonesModule } from './zones/zones.module';
import { Document } from './documents/entities/document.entity';
import { DocumentsModule } from './documents/documents.module';
import { WaterModule } from './water/water.module';
import { GasModule } from './gas/gas.module';
import { ElectricityModule } from './electricity/electricity.module';
import { TransportModule } from './transport/transport.module';
import { ParkingLot } from './parking/entities/parking-lot.entity';
import { ParkingSlot } from './parking/entities/parking-slot.entity';
import { Booking } from './parking/entities/booking.entity';
import { Violation } from './parking/entities/violation.entity';
import { ParkingModule } from './parking/parking.module';
import { Vehicle } from './parking/entities/vehicle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: Number(config.get<string>('DATABASE_PORT')),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Division,
          District,
          Upazila,
          Thana,
          Category,
          Report,
          Comment,
          StatusHistory,
          ReportSupport,
          Notification,
          Zone,
          Document,
          ParkingLot,
          ParkingSlot,
          Booking,
          Violation,
          Vehicle,
        ],
        synchronize: true,
      }),
    }),

    UsersModule,
    AuthModule,
    LocationsModule,
    CategoriesModule,
    ReportsModule,
    GatewayModule,
    NotificationsModule,
    ZonesModule,
    DocumentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    WaterModule,
    GasModule,
    ElectricityModule,
    TransportModule,
    ParkingModule,
  ],
})
export class AppModule {}
