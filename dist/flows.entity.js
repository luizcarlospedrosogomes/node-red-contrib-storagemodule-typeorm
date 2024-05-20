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
exports.Flows = void 0;
var typeorm_1 = require("typeorm");
var Flows = /** @class */ (function () {
    function Flows() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Flows.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text' }),
        __metadata("design:type", String)
    ], Flows.prototype, "flows", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text' }),
        __metadata("design:type", String)
    ], Flows.prototype, "credentials", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text' }),
        __metadata("design:type", String)
    ], Flows.prototype, "settings", void 0);
    Flows = __decorate([
        (0, typeorm_1.Entity)()
    ], Flows);
    return Flows;
}());
exports.Flows = Flows;
//# sourceMappingURL=flows.entity.js.map