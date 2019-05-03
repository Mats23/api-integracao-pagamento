import { Injectable, HttpService } from '@nestjs/common';
import { Plan } from 'src/plan/plan';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class PlanoService {
    url:string = 'https://api.mundipagg.com/core/v1/';
    plan:Plan;
    constructor(private readonly httpService:HttpService) {
        this.plan = new Plan();

    }


    createPlan(plan:Plan):Observable<AxiosResponse<Plan>> {      
        plan.items.map (item => {
            if(item.name === "" || item.name === undefined) {
                item.name = 'Sanarflix';
            }
            
        })
        return this.httpService.post(this.url + 'plans',plan).pipe(map(response => {
            return response.data;
        }));
       
    }

}
