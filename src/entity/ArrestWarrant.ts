import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { RedNoticeDetailsEntityDB } from "./RedNoticeDetails";
import { Country } from "./Country";
import { AppDataSource } from "../data-source";

@Entity()
export class ArrestWarrant {

    @PrimaryGeneratedColumn()
    id: number
    /**
     * The ID of the country issuing the arrest warrant.
     */
    @Column({ nullable: true })
    @ManyToOne(() => Country, (country) => country.country_id, {
        cascade: true,
    })
    @JoinColumn({ name: "issuing_country_id" })
    issuing_country_id: Country;
    /**
     * The charge listed in the arrest warrant.
     */
    @Column({ type: 'text', nullable: true })
    charge: string;

    @ManyToOne(() => RedNoticeDetailsEntityDB, (notice) => notice.arrest_warrants)
    notice: RedNoticeDetailsEntityDB;

    constructor(issuing_country_id: string, charge: string, notice: RedNoticeDetailsEntityDB) {
        this.charge = charge;
        this.setCountry(issuing_country_id).then((country) => this.issuing_country_id = country);
        this.notice = notice;
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

}
