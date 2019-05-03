import { Module, HttpModule } from '@nestjs/common';
import { clienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { CartaoController } from './cartao/cartao.controller';
import { CartaoService } from './cartao/cartao.service';
import { PlanoController } from './plano/plano.controller';
import { PlanoService } from './plano/plano.service';
import { AssinaturaController } from './assinatura/assinatura.controller';
import { AssinaturaService } from './assinatura/assinatura.service';


@Module({
  controllers: [ clienteController, CartaoController, PlanoController, AssinaturaController],
  providers: [ ClienteService, CartaoService, PlanoService, AssinaturaService],
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      headers:{               
        'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
        'Content-Type': 'application/json'              
      }
    })
  })],

})
export class AppModule {}
