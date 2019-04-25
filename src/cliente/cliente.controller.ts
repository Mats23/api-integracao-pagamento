import { Controller, Req, Post, Body, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import {  Assinatura } from './interface/assinatura';
import { Card } from 'dist/src/cliente/card/card';

@Controller('cliente')
export class clienteController {

    constructor(private readonly clienteService:ClienteService) {}

    @Post()
    cadastrarCliente(@Body() assinatura:Assinatura):Promise<Assinatura> {
        try {
            return this.clienteService.createCliente(assinatura);
        } catch (error) {
            console.dir(error)
        }
    }

    @Put()
    alterarDadosCartao(@Body() card:Card):Promise<Card> {
        try {
            return this.clienteService.alterarCartao(card);
        }catch(error) {
            console.dir(error);
        }
    }

}
