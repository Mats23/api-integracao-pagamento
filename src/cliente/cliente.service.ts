import { Injectable, HttpService } from '@nestjs/common';

import { Assinatura } from '../interface/assinatura';
import { Card } from '../card/card';
import { Customer } from '../customer/customer';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Plan } from 'dist/src/cliente/plan/plan';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClienteService {

    url:string = 'https://api.mundipagg.com/core/v1/';
    cliente:Customer[] = [];    
    assinatura: Assinatura;
    card:Card;
    clienteProxy: ClientProxy;
    observer:BehaviorSubject<Assinatura> = new BehaviorSubject<Assinatura>(this.assinatura);

    constructor(private readonly httpService:HttpService) {
        this.card = new Card();
        this.assinatura = new Assinatura();
        this.clienteProxy = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379'
            }
        })
    }

    createCliente(assinatura:Assinatura):Observable<Customer>  {
      const patternSave = { cmd: 'SAVE_CUSTOMERS' };
      return this.clienteProxy.send<Customer>(patternSave,assinatura.customer).pipe(map(response => {
        return response;
    }));
     
    }

}
