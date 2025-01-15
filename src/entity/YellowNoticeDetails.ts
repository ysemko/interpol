import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Language } from "./Language";
import { Country } from "./Country";
import { EyeColor } from "./EyeColor";
import { Hair } from "./Hair";
import { AppDataSource } from "../data-source";
import { YellowNoticeDetailsEntity } from "interpol.ts/dist/models/YellowNoticeDetails";

/**
 * Represents the details of a Yellow Notice entity.
 */
@Entity()
export class YellowNoticeDetailsEntityDB {
    /**
     * The country associated with the entity. Two digit country code.
     */
    @ManyToOne(() => Country, (country) => country.country_id, {
        cascade: true,
    })
    @JoinColumn({ name: "country" })
    country: Country;
    /**
     * The date of birth of the entity.
     */
    @Column({ nullable: true })
    date_of_birth?: string;
    /**
     * The name of the entity's mother.
     */
    @Column({ nullable: true })
    mother_name?: string;
    /**
     * List of countries likely to be visited by the entity. Two digit country code.
     */
    @ManyToMany(() => Country,{
        cascade: true,
    })
    @JoinTable()
    countries_likely_to_be_visited: Country[];
    /**
     * The forename of the entity's mother.
     */
    @Column({ nullable: true })
    mother_forename?: string;
    /**
     * The nationalities of the entity. Two digit country code.
     */
    @ManyToMany(() => Country, {
        cascade: true,
    })
    @JoinTable()
    nationalities: Country[];
    /**
     * The ID representing the eye color of the entity.
     */
    @ManyToMany(() => EyeColor, {
        cascade: true,
    })
    @JoinTable()
    eye_colors_id?: EyeColor;
    /**
     * The sex of the entity.
     */
    @Column({ type: "enum", enum: ["F", "M", "U"], default: "U" })
    sex_id?: "F" | "M" | "U";
    /**
     * The ID representing the hair type of the entity.
     */
    @ManyToMany(() => Hair, {
        cascade: true,
    })
    @JoinTable()
    hairs_id?: Hair;
    /**
     * The place associated with the entity.
     */
    @Column({ nullable: true })
    place: string;
    /**
     * List of IDs representing languages spoken by the entity. Three digit language code.
     */
    @ManyToMany(() => Language, {
        cascade: true,
    })
    @JoinTable()
    language_spoken_ids: Language[];
    /**
     * The date of the event related to the entity.
     */
    @Column({ nullable: true })
    date_of_event?: string;
    /**
     * The height of the entity.
     */
    @Column({ type: "numeric", nullable: true })
    height?: number;
    /**
     * The forename of the entity's father.
     */
    @Column({ nullable: true })
    father_forename?: string;
    /**
     * Distinguishing marks of the entity.
     */
    @Column({ type: "text", nullable: true })
    distinguishing_marks?: string;
    /**
     * The birth name of the entity.
     */
    @Column({ nullable: true })
    birth_name?: string;
    /**
     * The weight of the entity.
     */
    @Column({ type: "numeric", nullable: true })
    weight?: number;
    /**
     * The unique identifier for the entity.
     */
    @PrimaryColumn()
    entity_id: string;
    /**
     * The place of birth of the entity.
     */
    @Column({ nullable: true })
    place_of_birth?: string;
    /**
     * The name of the entity's father.
     */
    @Column({ nullable: true })
    father_name?: string;
    /**
     * The name of the entity.
     */
    @Column({ nullable: true })
    name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", update: false })
    insert_time: Date;

    constructor(data: YellowNoticeDetailsEntity) {
        if (!data) return;
        this.setCountry(data.country).then((country) => this.country = country);
        this.date_of_birth = data.date_of_birth;
        this.mother_name = data.mother_name;
        this.countries_likely_to_be_visited = [];
        this.mother_forename = data.mother_forename;
        this.nationalities = [];
        this.setEye(data.eye_colors_id).then((eye: EyeColor) => this.eye_colors_id = eye);
        // this.eye_colors_id = [];
        this.sex_id = data.sex_id;
        this.setHair(data.hairs_id).then((hair: Hair) => this.hairs_id = hair);
        // this.hairs_id = [];
        this.place = data.place;
        this.language_spoken_ids = [];
        this.date_of_event = data.date_of_event;
        this.height = data.height;
        this.father_forename = data.father_forename;
        this.distinguishing_marks = data.distinguishing_marks;
        this.birth_name = data.birth_name;
        this.weight = data.weight;
        this.entity_id = data.entity_id;
        this.place_of_birth = data.place_of_birth;
        this.father_name = data.father_name;
        this.name = data.name;

        if (data.countries_likely_to_be_visited)
            this.setCountriesVisited(data.countries_likely_to_be_visited);
        if (data.language_spoken_ids)
            this.setLanguagesSpokenIds(data.language_spoken_ids);
        if (data.nationalities)
            this.setNationalities(data.nationalities);
        // if (data.eye_colors_id)
        //     this.setEyesColorsId(data.eye_colors_id);
        // if (data.hairs_id)
        //     this.setHairsId(data.hairs_id);
    }

    private async setLanguagesSpokenIds(languages: string[]) {
        const languageRepository = AppDataSource.getRepository(Language);
        for (const lang of languages) {
            let language = await languageRepository.findOne({ where: { language_id: lang } });
            if (!language) {
                language = new Language(lang);
                await languageRepository.save(language);
            }
            this.language_spoken_ids.push(language);
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

    private async setCountriesVisited(countries: string[]) {
        const countryRepository = AppDataSource.getRepository(Country);
        for (const nation of countries) {
            const country = await this.setCountry(nation);
            this.countries_likely_to_be_visited.push(country);
        }
    }

    private async setHair(hair_id: string): Promise<Hair> {
        if (!hair_id) return null;
        const hairRepository = AppDataSource.getRepository(Hair);
        let hair = await hairRepository.findOne({ where: { hair_id: hair_id } });
        if (!hair) {
            hair = new Hair(hair_id);
            await hairRepository.save(hair);
        }
        return hair;
    }

    private async setEye(eye_id: string): Promise<EyeColor> {
        if (!eye_id) return null;
        const eyeRepository = AppDataSource.getRepository(EyeColor);
        let eye = await eyeRepository.findOne({ where: { eyes_color_id: eye_id } });
        if (!eye) {
            eye = new EyeColor(eye_id);
            await eyeRepository.save(eye);
        }
        return eye;
    }

    // private async setEyesColorsId(colors: string[]) {
    //     const eyeColorRepository = AppDataSource.getRepository(EyeColor);
    //     for (const color of colors) {
    //         let eyeColor = await eyeColorRepository.findOne({ where: { eyes_color_id: color } });
    //         if (!eyeColor) {
    //             eyeColor = new EyeColor(color);
    //             await eyeColorRepository.save(eyeColor);
    //         }
    //         this.eye_colors_id.push(eyeColor);
    //     }
    // }

    // private async setHairsId(hairs: string[]) {
    //     const hairRepository = AppDataSource.getRepository(Hair);
    //     for (const hair of hairs) {
    //         let hairEntity = await hairRepository.findOne({ where: { hair_id: hair } });
    //         if (!hairEntity) {
    //             hairEntity = new Hair(hair);
    //             await hairRepository.save(hairEntity);
    //         }
    //         this.hairs_id.push(hairEntity);
    //     }
    // }
}
