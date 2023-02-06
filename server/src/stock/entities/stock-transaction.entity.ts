import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseModel} from "../../models/base.entity";
import {StockEntity} from "./stock.entity";
import {UserEntity} from "../../user/entities/user.entity";


@Entity({
    name: 'stock_transaction'
})
export class StockTransactionEntity extends BaseModel {
    @PrimaryGeneratedColumn("increment", {
        type: "integer",
    })
    stock_transaction_id: number;

    @OneToOne(() => StockEntity)
    @JoinColumn({
        referencedColumnName: 'stock_id',
        name: 'stock_id'
    })
    stock: StockEntity;

    @OneToOne(() => UserEntity)
    @JoinColumn({
        referencedColumnName: 'user_id',
        name: 'user_id'
    })
    user: UserEntity;

    @OneToOne(() => UserEntity)
    @JoinColumn({
        referencedColumnName: 'user_id',
        name: 'target_id'
    })
    target: UserEntity;

    @Column({
        type: "integer",
        default: 0
    })
    trading_volume: number; // khối lượng giao dịch

    @Column({
        type: "integer",
        default: 0
    })
    trading_price: number; // giá giao dịch

    @Column({
        type:"smallint",
        default: 1
    })
    is_valid_today: number //Giao dịch hợp lệ trong hôm nay

    @Column({
        type:"smallint",
        default: 0
    })
    status: number //0 - penđing, 1 - success, 2 - reject





}