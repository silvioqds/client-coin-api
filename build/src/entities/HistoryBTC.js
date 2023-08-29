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
exports.HistoryBTC = void 0;
const typeorm_1 = require("typeorm");
let HistoryBTC = exports.HistoryBTC = class HistoryBTC {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid") // "uuid" são hash de números e letras misturados
    ,
    __metadata("design:type", String)
], HistoryBTC.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Object)
], HistoryBTC.prototype, "price_high", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Object)
], HistoryBTC.prototype, "price_low", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Object)
], HistoryBTC.prototype, "price_open", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Object)
], HistoryBTC.prototype, "price_close", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HistoryBTC.prototype, "time_open", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HistoryBTC.prototype, "time_close", void 0);
exports.HistoryBTC = HistoryBTC = __decorate([
    (0, typeorm_1.Entity)({ name: 'HistoryBTC' })
], HistoryBTC);
//# sourceMappingURL=HistoryBTC.js.map