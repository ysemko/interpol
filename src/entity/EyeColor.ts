import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class EyeColor {

    @PrimaryGeneratedColumn()
    id: number
    /**
     * Eye color
     */
   @Column()
   eyes_color_id: string;

   constructor(eyes_color_id: string) {
        this.eyes_color_id = eyes_color_id;
    }
}
