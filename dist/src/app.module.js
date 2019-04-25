"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cliente_controller_1 = require("./cliente/cliente.controller");
const cliente_service_1 = require("./cliente/cliente.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        controllers: [cliente_controller_1.clienteController],
        providers: [cliente_service_1.ClienteService],
        imports: [common_1.HttpModule.registerAsync({
                useFactory: () => ({
                    headers: {
                        'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
                        'Content-Type': 'application/json'
                    }
                })
            })],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map