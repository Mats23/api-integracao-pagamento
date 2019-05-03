import { Controller, Req, Post, Body, Put, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import {  Assinatura } from '../interface/assinatura';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Customer } from '../customer/customer';
import { Plan } from '../plan/plan';


@Controller('cliente')
export class clienteController {

    constructor(private readonly clienteService:ClienteService) {
        
    }

    @Post()
    cadastrarCliente(@Body() assinatura:Assinatura):Observable<Customer>  {
        try {
            
            return this.clienteService.createCliente(assinatura);
            
        } catch (error) {
            console.dir(error)
        }
    }


}
