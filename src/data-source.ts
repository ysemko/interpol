import "reflect-metadata"
import { DataSource } from "typeorm"
import { RedNoticeDetailsEntityDB } from "./entity/RedNoticeDetails"
import { ArrestWarrant } from "./entity/ArrestWarrant"
import { Country } from "./entity/Country"
import { EyeColor } from "./entity/EyeColor"
import { Hair } from "./entity/Hair"
import { Language } from "./entity/Language"
import { YellowNoticeDetailsEntityDB } from "./entity/YellowNoticeDetails"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "interpol",
    synchronize: true,
    logging: false,
    entities: [RedNoticeDetailsEntityDB, YellowNoticeDetailsEntityDB, ArrestWarrant, Country, EyeColor, Hair, Language],
    migrations: [],
    subscribers: [],
})
