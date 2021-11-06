import { Test, TestingModule } from '@nestjs/testing';
import { ClothController } from './cloth.controller';

describe('ClothController', () => {
  let controller: ClothController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothController],
    }).compile();

    controller = module.get<ClothController>(ClothController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
