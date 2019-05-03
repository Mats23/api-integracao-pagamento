import { Injectable, HttpService } from '@nestjs/common';
import { Assinatura } from 'src/interface/assinatura';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AssinaturaService {


    url:string = 'https://api.mundipagg.com/core/v1/';
    assinatura:Assinatura;
    constructor(private readonly httpService:HttpService) {
        this.assinatura = new Assinatura();

    }

    
    createAssinatura(assinatura:Assinatura):Observable<AxiosResponse<Assinatura>> {
        return this.httpService.post(this.url + 'subscriptions',assinatura).pipe(map(response => {
            return response.data;
        }))
            
        
    }

    cancelar(id:string):Observable<AxiosResponse<Assinatura>> {
        console.dir(this.url + 'subscriptions/'+id);
        return this.httpService.delete(this.url + 'subscriptions/'+id).pipe(map(response => {
            return response.data;
        }))
            
        
    }

    alterarCartao(assinatura:Assinatura):Observable<Assinatura> {
        console.dir(assinatura.card);
        return this.httpService.patch(this.url+'subscriptions/'+assinatura.id+'/card',assinatura).pipe(map(retorno => {
                return retorno.data;
            }));
       
    }
}
