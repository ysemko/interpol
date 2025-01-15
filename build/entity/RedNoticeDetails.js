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
exports.RedNoticeDetailsEntityDB = void 0;
var typeorm_1 = require("typeorm");
var ArrestWarrant_1 = require("./ArrestWarrant");
var Language_1 = require("./Language");
var Country_1 = require("./Country");
var EyeColor_1 = require("./EyeColor");
var Hair_1 = require("./Hair");
/**
 * Represents the details of a Red Notice entity.
 */
var RedNoticeDetailsEntityDB = /** @class */ (function () {
    function RedNoticeDetailsEntityDB(data) {
        this.arrest_warrants = data.arrest_warrants.map(function (warrant) { return new ArrestWarrant_1.ArrestWarrant(warrant.issuing_country_id, warrant.charge); });
        this.weight = data.weight;
        this.forename = data.forename;
        this.date_of_birth = data.date_of_birth;
        this.entity_id = data.entity_id;
        this.languages_spoken_ids = data.languages_spoken_ids.map(function (language) { return new Language_1.Language(language); });
        this.nationalities = data.nationalities.map(function (nation) { return new Country_1.Country(nation); });
        ;
    }
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArrestWarrant_1.ArrestWarrant; }, function (arrest_warrants) { return arrest_warrants.notice; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], RedNoticeDetailsEntityDB.prototype, "arrest_warrants", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], RedNoticeDetailsEntityDB.prototype, "weight", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "forename", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "date_of_birth", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "entity_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Language_1.Language; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], RedNoticeDetailsEntityDB.prototype, "languages_spoken_ids", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Country_1.Country; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], RedNoticeDetailsEntityDB.prototype, "nationalities", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], RedNoticeDetailsEntityDB.prototype, "height", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: ["F", "M", "U"] }),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "sex_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "country_of_birth_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "distinguishing_marks", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return EyeColor_1.EyeColor; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], RedNoticeDetailsEntityDB.prototype, "eyes_colors_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Hair_1.Hair; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], RedNoticeDetailsEntityDB.prototype, "hairs_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RedNoticeDetailsEntityDB.prototype, "place_of_birth", void 0);
    RedNoticeDetailsEntityDB = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Object])
    ], RedNoticeDetailsEntityDB);
    return RedNoticeDetailsEntityDB;
}());
exports.RedNoticeDetailsEntityDB = RedNoticeDetailsEntityDB;
//# sourceMappingURL=RedNoticeDetails.js.map