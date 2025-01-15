import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Hair {

    @PrimaryGeneratedColumn()
    id: number
    /**
     * hair color/type
     */
   @Column()
   hair_id: string;

   constructor(hair_id: string) {
        this.hair_id = hair_id;
    }
}
