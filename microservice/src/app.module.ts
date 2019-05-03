import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      headers:{               
        'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
        'Content-Type': 'application/json'              
      }
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
