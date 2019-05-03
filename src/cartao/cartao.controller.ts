import { Controller, Post, Body, Put, Patch } from '@nestjs/common';
import { CartaoService } from './cartao.service';
import { Assinatura } from 'dist/src/cliente/interface/assinatura';
import { Observable } from 'rxjs';
import { Card } from 'dist/src/cliente/card/card';

@Controller('cartao')
export class CartaoController {



    constructor(private readonly cartaoService:CartaoService) {}

    @Post()
    cadastrarCartao(@Body() assinatura:Assinatura):Observable<Card> {
        try {
            return this.cartaoService.createCard(assinatura);
        } catch (error) {
            console.dir(error);
        }
    }

   
}
