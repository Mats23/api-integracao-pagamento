import { Injectable, HttpService, Next } from '@nestjs/common';

import { Assinatura } from './interface/assinatura';
import { CardDTO } from './dto/CardDTO';
import { Card } from './card/card';
import { AssinaturaDTO } from './dto/assinaturaDTO';
import { Plan } from './plan/plan';
import { resolve } from 'path';
import { Customer } from './customer/customer';
import { clienteController } from 'dist/src/cliente/cliente.controller';
import { throws } from 'assert';

@Injectable()
export class ClienteService {

    url:string = 'https://api.mundipagg.com/core/v1/';
    cliente:Customer[] = [];    
    assinatura:Assinatura;
    card:Card;

    constructor(private readonly httpService:HttpService) {
        this.assinatura = new Assinatura();
        this.card = new Card();
    }

    async alterarCartao(card:Card):Promise<Card> {
        const cliente = await this.getAllCustomers().then(result => {
           return result;
        });
       return await  new Promise<Card>( resolve => {
            this.getAllCards(cliente).then(result => {
                console.dir(result[0]);
                console.dir(this.url+this.assinatura.customer.id+'/cards/'+result[0].id);

                this.httpService.put(this.url+this.assinatura.customer.id+'/cards/'+result[0].id).subscribe(retorno => {
                    resolve(retorno.data);
                })
            });
        })
       
              
                

        
    }

    async createCliente(assinatura:Assinatura):Promise<Assinatura> {
       const cliente = await new Promise<Assinatura>(resolve => {
            this.httpService.post(this.url + 'customers', assinatura.customer).subscribe(retorno => {
                this.assinatura.customer = retorno.data;  
                this.assinatura.card = assinatura.card;
                this.assinatura.plan = assinatura.plan;
                resolve(this.assinatura);  
            });
        });

        await this.createCard(this.assinatura.card,this.assinatura.customer.id);
        const plano = await this.createPlan(this.assinatura.plan);
        this.assinatura.plan_id = plano.plan.id;
        this.assinatura.customer_id = cliente.customer.id;
        return await this.createAssinatura(this.assinatura);
        
    }
    
    private async createCard(card:Card, id:string):Promise<Assinatura> {
        return await new Promise<Assinatura>(resolve => {
            this.httpService.post(this.url + 'customers/'+id +'/'+'cards',card).subscribe(retorno => {
                this.assinatura.card = retorno.data;
                this.assinatura.card.number = card.number;
                resolve(this.assinatura);

        });
          
        });
    }

    private async createPlan(plan:Plan):Promise<Assinatura> {
        return await new Promise<Assinatura>(resolve => {
            plan.items.map (item => {
                item.name = 'Sanarflix';
            })
            this.httpService.post(this.url + 'plans',plan).subscribe(retorno => {
                this.assinatura.plan = retorno.data;
                resolve(this.assinatura);
            })
        })
    }

    private async createAssinatura(assinatura:Assinatura):Promise<Assinatura> {
        return await new Promise<Assinatura>(resolve => {
            this.httpService.post(this.url + 'subscriptions',assinatura).subscribe(retorno => {
                resolve(retorno.data);
            })
        })
    }

    private async getAllCustomers():Promise<Customer> {
        return await new Promise<Customer>(resolve => {
            this.httpService.get(this.url + 'customers').subscribe(retorno => {
                const listaCustomers = retorno.data.data;
                listaCustomers.map( cliente => {
                    this.assinatura.customer = cliente;
                    resolve(this.assinatura.customer);
                })
                
            })
        })
    }

    private async getAllCards(customer:Customer):Promise<Card> {
        return await new Promise<Card>(resolve => {
            this.httpService.get(this.url +'customers/' +customer.id+'/cards').subscribe(retorno => {
                this.assinatura.customer.id = customer.id;
                this.assinatura.card = retorno.data.data;
                resolve(this.assinatura.card);
            });
        
            
        })
    }
  
}
