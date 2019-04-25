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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const assinatura_1 = require("./interface/assinatura");
const card_1 = require("./card/card");
let ClienteService = class ClienteService {
    constructor(httpService) {
        this.httpService = httpService;
        this.url = 'https://api.mundipagg.com/core/v1/';
        this.cliente = [];
        this.assinatura = new assinatura_1.Assinatura();
        this.card = new card_1.Card();
    }
    alterarCartao(card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolver => {
                const cliente = this.getAllCustomers().then(result => {
                    return result.filter(cliente => {
                        return cliente.name === card.holder_name;
                    });
                });
                cliente.then(cliente => {
                    this.getAllCards(cliente).then(result => {
                        result.forEach(cartoes => {
                        });
                    });
                });
            });
        });
    }
    createCliente(assinatura) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield new Promise(resolve => {
                this.httpService.post(this.url + 'customers', assinatura.customer).subscribe(retorno => {
                    this.assinatura.customer = retorno.data;
                    this.assinatura.card = assinatura.card;
                    this.assinatura.plan = assinatura.plan;
                    resolve(this.assinatura);
                });
            });
            yield this.createCard(this.assinatura.card, this.assinatura.customer.id);
            const plano = yield this.createPlan(this.assinatura.plan);
            this.assinatura.plan_id = plano.plan.id;
            this.assinatura.customer_id = cliente.customer.id;
            return yield this.createAssinatura(this.assinatura);
        });
    }
    createCard(card, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.httpService.post(this.url + 'customers/' + id + '/' + 'cards', card).subscribe(retorno => {
                    this.assinatura.card = retorno.data;
                    this.assinatura.card.number = card.number;
                    resolve(this.assinatura);
                });
            });
        });
    }
    createPlan(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                plan.items.map(item => {
                    item.name = 'Sanarflix';
                });
                this.httpService.post(this.url + 'plans', plan).subscribe(retorno => {
                    this.assinatura.plan = retorno.data;
                    resolve(this.assinatura);
                });
            });
        });
    }
    createAssinatura(assinatura) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.httpService.post(this.url + 'subscriptions', assinatura).subscribe(retorno => {
                    resolve(retorno.data);
                });
            });
        });
    }
    getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.httpService.get(this.url + 'customers').subscribe(retorno => {
                    this.cliente = retorno.data.data;
                    resolve(this.cliente);
                });
            });
        });
    }
    getAllCards(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                customer.forEach(cliente => {
                    this.httpService.get(this.url + cliente.id + 'cards').subscribe(retorno => {
                        resolve(retorno.data);
                    });
                });
            });
        });
    }
};
ClienteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map