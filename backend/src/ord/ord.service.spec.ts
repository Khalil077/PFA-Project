import { Test, TestingModule } from '@nestjs/testing';
import { OrdService } from './ord.service';

describe('OrdService', () => {
  let service: OrdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdService],
    }).compile();

    service = module.get<OrdService>(OrdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
