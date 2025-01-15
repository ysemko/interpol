"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var RedNoticeDetails_1 = require("./entity/RedNoticeDetails");
var ArrestWarrant_1 = require("./entity/ArrestWarrant");
var Country_1 = require("./entity/Country");
var EyeColor_1 = require("./entity/EyeColor");
var Hair_1 = require("./entity/Hair");
var Language_1 = require("./entity/Language");
var Notice_1 = require("./entity/Notice");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "interpol",
    synchronize: true,
    logging: false,
    entities: [RedNoticeDetails_1.RedNoticeDetailsEntityDB, ArrestWarrant_1.ArrestWarrant, Country_1.Country, EyeColor_1.EyeColor, Hair_1.Hair, Language_1.Language, Notice_1.Notice],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map