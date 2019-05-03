import { Controller, Get, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { Customer } from './customer';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Controller()
export class AppController {
  cliente:ClientProxy;
  url:string = 'https://api.mundipagg.com/core/v1/';

  constructor(private readonly appService: AppService,private readonly httpService:HttpService) {}

  @MessagePattern({ cmd: 'LIST_CUSTOMERS' })
  listCustomers(): Observable<AxiosResponse<Customer>> {
      return this.httpService.get(this.url + 'customers').pipe(map( response => {
              return response.data;
      }));

  }
  @MessagePattern({ cmd: 'SAVE_CUSTOMERS'})
  saveCustomers(customer:Customer):Observable<AxiosResponse<Customer>> {
    return this.httpService.post(this.url + 'customers', customer).pipe(map( response => {
     return  response.data;
      
  }));
  }
}
