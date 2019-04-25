import { HttpService } from '@nestjs/common';
import { Assinatura } from './interface/assinatura';
export declare class ClienteService {
    private readonly httpService;
    url: string;
    assinatura: Assinatura;
    constructor(httpService: HttpService);
    createCliente(assinatura: Assinatura): Promise<Assinatura>;
    private createCard;
    private createPlan;
    private createAssinatura;
}
