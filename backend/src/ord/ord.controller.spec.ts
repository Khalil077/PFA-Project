import { Test, TestingModule } from '@nestjs/testing';
import { OrdController } from './ord.controller';
import { OrdService } from './ord.service';

describe('OrdController', () => {
  let controller: OrdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdController],
      providers: [OrdService],
    }).compile();

    controller = module.get<OrdController>(OrdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
