import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { ArrestWarrant } from "./ArrestWarrant";
import { Language } from "./Language";
import { Country } from "./Country";
import { EyeColor } from "./EyeColor";
import { Hair } from "./Hair";
import { RedNoticeDetailsEntity } from "interpol.ts/dist/models/RedNoticeDetails";
import { AppDataSource } from "../data-source";

/**
 * Represents the details of a Red Notice entity.
 */

@Entity()
export class RedNoticeDetailsEntityDB {
    /**
     * List of arrest warrants associated with the entity.
     */
    @OneToMany(() => ArrestWarrant, (arrest_warrants) => arrest_warrants.notice, {
        cascade: true,
    })
    arrest_warrants: ArrestWarrant[];
    /**
     * The weight of the individual.
     */
    @Column({ type: "numeric", nullable: true })
    weight: number;
    /**
     * The forename of the individual.
     */
    @Column({ nullable: true })
    forename: string;
    /**
     * The date of birth of the individual.
     */
    @Column({ nullable: true })
    date_of_birth: string;
    /**
     * The unique identifier for the entity.
     */
    @PrimaryColumn()
    entity_id: string;
    /**
     * List of language IDs spoken by the individual. Three digit language code.
     */
    @ManyToMany(() => Language, {
        cascade: true,
    })
    @JoinTable()
    languages_spoken_ids: Language[];
    /**
     * List of nationality IDs of the individual. Two digit country code.
     */
    @ManyToMany(() => Country, {
        cascade: true,
    })
    @JoinTable()
    nationalities: Country[];
    /**
     * The height of the individual.
     */
    @Column({ type: "numeric", nullable: true })
    height: number;
    /**
     * The sex identifier of the individual (F, M, U).
     */
    @Column({ type: "enum", enum: ["F", "M", "U"], default: "U" })
    sex_id: "F" | "M" | "U";
    /**
     * The ID of the country where the individual was born. Two digit country code.
     */
    @Column({ nullable: true })
    @ManyToOne(() => Country, (country) => country.country_id, {
        cascade: true,
    })
    @JoinColumn({ name: "country_of_birth_id" })
    country_of_birth_id: Country;
    /**
     * The last name of the individual.
     */
    @Column({ nullable: true })
    name: string;
    /**
     * Any distinguishing marks of the individual.
     */
    @Column({ type: "text" , nullable: true })
    distinguishing_marks: string;
    /**
     * List of eye color IDs.
     */
    @ManyToMany(() => EyeColor, {
        cascade: true,
    })
    @JoinTable()
    eyes_colors_id: EyeColor[];
    /**
     * List of hair color/type IDs.
     */
    @ManyToMany(() => Hair, {
        cascade: true,
    })
    @JoinTable()
    hairs_id: Hair[];
    /**
     * The place of birth of the individual.
     */
    @Column({ nullable: true })
    place_of_birth: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", update: false })
    insert_time: Date;


    constructor(data: RedNoticeDetailsEntity) {
        if (!data) return;
        this.arrest_warrants = data.arrest_warrants ? data.arrest_warrants.map((warrant) => new ArrestWarrant(warrant.issuing_country_id, warrant.charge, this)) : [];
        this.weight = data.weight;
        this.forename = data.forename;
        this.date_of_birth = data.date_of_birth;
        this.entity_id = data.entity_id;
        this.languages_spoken_ids = [];
        this.nationalities = [];
        this.height = data.height;
        this.sex_id = data.sex_id;
        this.setCountry(data.country_of_birth_id).then((country) => this.country_of_birth_id = country);
        this.name = data.name;
        this.distinguishing_marks = data.distinguishing_marks;
        this.eyes_colors_id = [];
        this.hairs_id = [];
        this.place_of_birth = data.place_of_birth;
        if (data.languages_spoken_ids)
            this.setLanguagesSpokenIds(data.languages_spoken_ids);
        if (data.nationalities)
            this.setNationalities(data.nationalities);
        if (data.eyes_colors_id)
            this.setEyesColorsId(data.eyes_colors_id);
        if (data.hairs_id)
            this.setHairsId(data.hairs_id);
    }

    private async setLanguagesSpokenIds(languages: string[]) {
        const languageRepository = AppDataSource.getRepository(Language);
        for (const lang of languages) {
            let language = await languageRepository.findOne({ where: { language_id: lang } });
            if (!language) {
                language = new Language(lang);
                await languageRepository.save(language);
            }
            this.languages_spoken_ids.push(language);
        }
    }

    private async setCountry(country_id: string): Promise<Country> {
        if (!country_id) return null;
        const countryRepository = AppDataSource.getRepository(Country);
        let country = await countryRepository.findOne({ where: { country_id: country_id } });
        if (!country) {
            country = new Country(country_id);
            await countryRepository.save(country);
        }
        return country;
    }

    private async setNationalities(nationalities: string[]) {
        const countryRepository = AppDataSource.getRepository(Country);
        for (const nation of nationalities) {
            const country = await this.setCountry(nation);
            this.nationalities.push(country);
        }
    }

    private async setEyesColorsId(colors: string[]) {
        const eyeColorRepository = AppDataSource.getRepository(EyeColor);
        for (const color of colors) {
            let eyeColor = await eyeColorRepository.findOne({ where: { eyes_color_id: color } });
            if (!eyeColor) {
                eyeColor = new EyeColor(color);
                await eyeColorRepository.save(eyeColor);
            }
            this.eyes_colors_id.push(eyeColor);
        }
    }

    private async setHairsId(hairs: string[]) {
        const hairRepository = AppDataSource.getRepository(Hair);
        for (const hair of hairs) {
            let hairEntity = await hairRepository.findOne({ where: { hair_id: hair } });
            if (!hairEntity) {
                hairEntity = new Hair(hair);
                await hairRepository.save(hairEntity);
            }
            this.hairs_id.push(hairEntity);
        }
    }
}
