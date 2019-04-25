import { Test, TestingModule } from '@nestjs/testing';
import { clienteController } from './cliente.controller';

describe('cliente Controller', () => {
  let controller: clienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [clienteController],
    }).compile();

    controller = module.get<clienteController>(clienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
