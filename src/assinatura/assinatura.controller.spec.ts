import { Test, TestingModule } from '@nestjs/testing';
import { AssinaturaController } from './assinatura.controller';

describe('Assinatura Controller', () => {
  let controller: AssinaturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssinaturaController],
    }).compile();

    controller = module.get<AssinaturaController>(AssinaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
