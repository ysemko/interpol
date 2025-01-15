import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number
    /**
     * Two digit country code.
     */
   @Column()
   country_id: string;

   constructor(country_id: string) {
        this.country_id = country_id;
    }
}
