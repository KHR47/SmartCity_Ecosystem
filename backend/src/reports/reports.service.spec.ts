import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Division } from '../locations/entities/division.entity';
import { District } from '../locations/entities/district.entity';
import { Thana } from '../locations/entities/thana.entity';
import { Upazila } from '../locations/entities/upazila.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { ReportSupport } from './entities/report-support.entity';
import { Report } from './entities/report.entity';
import { StatusHistory } from './entities/status-history.entity';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Division),
          useValue: {},
        },
        {
          provide: getRepositoryToken(District),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Upazila),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Thana),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: {},
        },
        {
          provide: getRepositoryToken(StatusHistory),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ReportSupport),
          useValue: {},
        },
        {
          provide: NotificationsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
