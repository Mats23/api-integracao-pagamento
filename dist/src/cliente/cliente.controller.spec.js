"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cliente_controller_1 = require("./cliente.controller");
describe('cliente Controller', () => {
    let controller;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [cliente_controller_1.clienteController],
        }).compile();
        controller = module.get(cliente_controller_1.clienteController);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=cliente.controller.spec.js.map