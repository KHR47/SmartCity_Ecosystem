import { Test, TestingModule } from '@nestjs/testing';
import { LeaksService } from './leaks.service';

describe('LeaksService', () => {
  let service: LeaksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaksService],
    }).compile();

    service = module.get<LeaksService>(LeaksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
