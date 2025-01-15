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
exports.EyeColor = void 0;
var typeorm_1 = require("typeorm");
var EyeColor = /** @class */ (function () {
    function EyeColor(eyes_color_id) {
        this.eyes_color_id = eyes_color_id;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EyeColor.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EyeColor.prototype, "eyes_color_id", void 0);
    EyeColor = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String])
    ], EyeColor);
    return EyeColor;
}());
exports.EyeColor = EyeColor;
//# sourceMappingURL=EyeColor.js.map