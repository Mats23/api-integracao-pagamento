import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';


@Module({
  controllers: [AppController, ClienteController ],
  providers: [AppService, ClienteService],
  imports: [HttpModule.register({
    headers:{               
      'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
      'Content-Type': 'application/json'              
    }
  })],
})
export class AppModule {}
