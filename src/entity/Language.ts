import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: number
    /**
     * Three digit language code.
     */
   @Column()
    language_id: string;

    constructor(language_id: string) {
        this.language_id = language_id;
    }
}
