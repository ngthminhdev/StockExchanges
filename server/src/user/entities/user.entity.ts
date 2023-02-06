import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CityEntity} from "../../models/city.entity";
import {DistrictEntity} from "../../models/district.entity";
import {WardEntity} from "../../models/ward.entity";
import {BaseModel} from "../../models/base.entity";


@Entity({
    name: 'user'
})
export class UserEntity extends BaseModel{
    @PrimaryGeneratedColumn('increment', {
        type: "integer",
    })
    user_id: number;

    @Column({
        type: 'text',
        unique: true,
        default: '',
    })
    email: string;

    @Column({
        type: 'text',
        unique: true,
        default: '',
    })
    name: string;

    @Column({
        type: 'text',
        default: '',
    })
    avatar: string;

    @Column({
        type: 'date',
        default: '01/01/2000',
    })
    date_of_birth: Date;

    @Column({
        type: 'text',
        default: '',
    })
    phone: string;

    @Column({
        type: 'text',
        default: '',
    })
    depository_number: string; //số lưu ký

    @Column({
        type: 'text',
        default: '',
    })
    identification_number: string; //Số căn cước

    @Column({
        type: 'text',
        default: '',
    })
    identification_date: Date; //Ngày cấp

    @Column({
        type: 'text',
        default: '',
    })
    identification_place: string; //Nơi cấp

    @OneToOne(() => CityEntity)
    @JoinColumn({
        referencedColumnName: 'city_id',
        name: 'city_id',
    })
    city: CityEntity;

    @OneToOne(() => DistrictEntity)
    @JoinColumn({
        name: 'district_id',
        referencedColumnName: 'district_id',
    })
    district: DistrictEntity;

    @OneToOne(() => WardEntity)
    @JoinColumn({
        name: 'ward_id',
        referencedColumnName: 'ward_id',
    })
    ward: WardEntity;

    @Column({
        type: "text",
        default: ''
    })
    address: string
}