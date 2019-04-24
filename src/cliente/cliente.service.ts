import { Injectable, HttpService } from '@nestjs/common';

import { Assinatura } from './interface/assinatura';
import { CardDTO } from './dto/CardDTO';
import { Card } from './card/card';
import { AssinaturaDTO } from './dto/assinaturaDTO';

@Injectable()
export class ClienteService {

    url:string = 'https://api.mundipagg.com/core/v1/';
   
    
    assinatura:Assinatura;

    constructor(private readonly httpService:HttpService) {
        this.assinatura = new Assinatura();
    }

    createCliente(assinatura:AssinaturaDTO):Promise<Assinatura> {
       return new Promise<Assinatura>(resolve => {
            this.httpService.post(this.url + 'customers', assinatura.body.cliente).subscribe(retorno => {
                this.assinatura.cliente = retorno.data;
                this.createCard(assinatura.body.cartao,this.assinatura.cliente.id).finally( () => {
                    console.dir(this.assinatura);
                    resolve(this.assinatura);
                });
                
            });
        })
    
    }

    private createCard(card:Card, id:string):Promise<Assinatura> {
        return new Promise<Assinatura>(resolve => {
            this.httpService.post(this.url + 'customers/'+id +'/'+'cards',card).subscribe(retorno => {
                this.assinatura.cartao = retorno.data;
                resolve(this.assinatura);
                // console.dir(this.assinatura);

        });
          
        });
    }

  
}
