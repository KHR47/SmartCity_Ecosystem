import { Test, TestingModule } from '@nestjs/testing';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

describe('MetersController', () => {
  let controller: MetersController;
  let service: jest.Mocked<Partial<MetersService>>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      requestMeter: jest.fn(),
      approveMeter: jest.fn(),
      logReading: jest.fn(),
      issueInvoice: jest.fn(),
      payInvoice: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetersController],
      providers: [
        {
          provide: MetersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<MetersController>(MetersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
