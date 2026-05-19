import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaterMeter } from './entities/water-meter.entity';
import { MetersService } from './meters.service';

describe('MetersService', () => {
  let service: MetersService;
  let repository: jest.Mocked<Partial<Repository<WaterMeter>>>;

  beforeEach(async () => {
    repository = {
      count: jest.fn().mockResolvedValue(0),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetersService,
        {
          provide: getRepositoryToken(WaterMeter),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<MetersService>(MetersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
