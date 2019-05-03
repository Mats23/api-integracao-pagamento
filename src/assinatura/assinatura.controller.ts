import { Controller, Post, Body, Delete, Patch } from '@nestjs/common';
import { AssinaturaService } from './assinatura.service';
import { Assinatura } from 'src/interface/assinatura';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Card } from 'src/card/card';

@Controller('assinatura')
export class AssinaturaController {


    constructor(private readonly assinaturaService:AssinaturaService) {}

    @Post()
    criarAssinatura(@Body() assinatura:Assinatura):Observable<AxiosResponse<Assinatura>> {
        try {
            return this.assinaturaService.createAssinatura(assinatura);
        } catch (error) {
            console.dir(error);
        }
    }

    @Delete()
    cancelarAssinatura(@Body() assinatura:Assinatura):Observable<AxiosResponse<Assinatura>> {
        try {
            return this.assinaturaService.cancelar(assinatura.id);
        } catch (error) {
            console.dir(error);
        }
    }

    @Patch()
    alterarDadosCartao(@Body() assinatura:Assinatura):Observable<Assinatura> {
        try {
            return this.assinaturaService.alterarCartao(assinatura);
        }catch(error) {
            console.dir(error);
        }
    }
}
