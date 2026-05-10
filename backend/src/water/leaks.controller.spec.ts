import { Test, TestingModule } from '@nestjs/testing';
import { LeaksController } from './leaks.controller';

describe('LeaksController', () => {
  let controller: LeaksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaksController],
    }).compile();

    controller = module.get<LeaksController>(LeaksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
