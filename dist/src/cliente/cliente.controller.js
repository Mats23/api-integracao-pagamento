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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const assinatura_1 = require("./interface/assinatura");
const rxjs_1 = require("rxjs");
let clienteController = class clienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    cadastrarCliente(assinatura) {
        try {
            return this.clienteService.createCliente(assinatura);
        }
        catch (error) {
            console.dir(error);
        }
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assinatura_1.Assinatura]),
    __metadata("design:returntype", rxjs_1.Observable)
], clienteController.prototype, "cadastrarCliente", null);
clienteController = __decorate([
    common_1.Controller('cliente'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], clienteController);
exports.clienteController = clienteController;
//# sourceMappingURL=cliente.controller.js.map