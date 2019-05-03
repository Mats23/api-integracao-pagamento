import { Controller, Post, Body } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { Plan } from 'dist/src/cliente/plan/plan';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('plano')
export class PlanoController {


    constructor(private readonly planoService:PlanoService) {}



    @Post()
    criarPlano(@Body() plan:Plan):Observable<AxiosResponse<Plan>> {
        try {
            return this.planoService.createPlan(plan);
        } catch (error) {
            console.dir(error);
        }
    }


}
