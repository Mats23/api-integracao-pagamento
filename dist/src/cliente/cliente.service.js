"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const assinatura_1 = require("./interface/assinatura");
const card_1 = require("./card/card");
const operators_1 = require("rxjs/operators");
const microservices_1 = require("@nestjs/microservices");
let ClienteService = class ClienteService {
    constructor(httpService) {
        this.httpService = httpService;
        this.url = 'https://api.mundipagg.com/core/v1/';
        this.card = new card_1.Card();
        this.assinatura = new assinatura_1.Assinatura();
        this.clienteProxy = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.REDIS,
            options: {
                url: 'redis://localhost:6379'
            }
        });
    }
    createCliente(assinatura) {
        const patternSave = { cmd: 'SAVE_CUSTOMERS' };
        this.clienteProxy.send(patternSave, assinatura.customer).pipe(operators_1.map(customer => {
            this.assinatura.customer = customer;
            this.createCard(assinatura.card, customer.id).pipe(operators_1.map(card => {
                this.assinatura.card = card;
            }));
            if (this.assinatura.card != null) {
                this.createPlan(assinatura.plan).pipe(operators_1.map(plan => {
                    this.assinatura.plan = plan;
                }));
            }
            console.dir(this.assinatura);
        }));
        return;
    }
    createCard(card, id) {
        return this.httpService.post(this.url + 'customers/' + id + '/' + 'cards', card).pipe(operators_1.map(response => {
            return response.data;
        }));
    }
    createPlan(plan) {
        return this.httpService.post(this.url + 'plans', plan).pipe(operators_1.map(response => {
            return response.data;
        }));
    }
    createAssinatura(assinatura) {
        return this.httpService.post(this.url + 'subscriptions', assinatura).pipe(operators_1.map(response => {
            return response.data;
        }));
    }
};
ClienteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map