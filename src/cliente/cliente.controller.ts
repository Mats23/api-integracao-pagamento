import { Controller, Req, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Customer } from './customer/customer';
import { CustomerDTO } from './dto/customerDTO';
import { Subscription } from 'rxjs';
import { ClienteDTO } from './dto/clienteDTO';
import {  Assinatura } from './interface/assinatura';
import { AssinaturaDTO } from './dto/assinaturaDTO';

@Controller('cliente')
export class ClienteController {

    constructor(private readonly clienteService:ClienteService) {}

    @Post()
    cadastrarCliente(@Req() assinatura:AssinaturaDTO):Promise<Assinatura> {
        try {
            return this.clienteService.createCliente(assinatura);
        } catch (error) {
            console.dir(error)
        }
    }
}
