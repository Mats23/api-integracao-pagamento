import { Injectable, HttpService } from '@nestjs/common';
import { Card } from 'src/card/card';
import { Observable } from 'rxjs';
import { Assinatura } from 'dist/src/cliente/interface/assinatura';
import { map } from 'rxjs/operators';
import { Customer } from 'dist/src/cliente/customer/customer';

@Injectable()
export class CartaoService {
    url:string = 'https://api.mundipagg.com/core/v1/';
    card:Card;


    constructor(private readonly httpService:HttpService) {
        this.card = new Card();

    }



    createCard(assinatura:Assinatura):Observable<Card> {
        return this.httpService.post(this.url + 'customers/'+assinatura.customer.id +'/'+'cards',assinatura.card).pipe(map(response => {
            return response.data;
        }));
          
      
    }


    

}
