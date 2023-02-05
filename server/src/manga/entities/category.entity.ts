import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseModel} from "../../models/base.entity";


@Entity({name: 'category'})
export class CategoryEntity extends BaseModel {
    @PrimaryGeneratedColumn('increment', {
        type: "integer",
        comment: 'category_id'
    })
    category_id: number;

    @Column({
        type: 'text',
        default: ''
    })
    label: string

    @Column({
        type: 'text',
        default: ''
    })
    description: string
}