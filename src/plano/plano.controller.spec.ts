import { Test, TestingModule } from '@nestjs/testing';
import { PlanoController } from './plano.controller';

describe('Plano Controller', () => {
  let controller: PlanoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanoController],
    }).compile();

    controller = module.get<PlanoController>(PlanoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
