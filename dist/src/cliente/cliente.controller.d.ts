import { ClienteService } from './cliente.service';
import { Assinatura } from './interface/assinatura';
export declare class clienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    cadastrarcliente(assinatura: Assinatura): Promise<Assinatura>;
}
