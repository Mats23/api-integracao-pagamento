import { Module, HttpModule } from '@nestjs/common';
import { clienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';


@Module({
  controllers: [ clienteController ],
  providers: [ ClienteService],
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
