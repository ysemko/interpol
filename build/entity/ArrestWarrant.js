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
exports.ArrestWarrant = void 0;
var typeorm_1 = require("typeorm");
var RedNoticeDetails_1 = require("./RedNoticeDetails");
var ArrestWarrant = /** @class */ (function () {
    function ArrestWarrant(issuing_country_id, charge) {
        this.charge = charge;
        this.issuing_country_id = issuing_country_id;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ArrestWarrant.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ArrestWarrant.prototype, "issuing_country_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], ArrestWarrant.prototype, "charge", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], ArrestWarrant.prototype, "charge_translation", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RedNoticeDetails_1.RedNoticeDetailsEntityDB; }, function (notice) { return notice.arrest_warrants; }),
        __metadata("design:type", RedNoticeDetails_1.RedNoticeDetailsEntityDB)
    ], ArrestWarrant.prototype, "notice", void 0);
    ArrestWarrant = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String])
    ], ArrestWarrant);
    return ArrestWarrant;
}());
exports.ArrestWarrant = ArrestWarrant;
//# sourceMappingURL=ArrestWarrant.js.map