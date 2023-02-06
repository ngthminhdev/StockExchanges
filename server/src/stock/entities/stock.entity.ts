import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseModel} from "../../models/base.entity";


@Entity({
    name: 'stock'
})
export class StockEntity extends BaseModel {
    @PrimaryGeneratedColumn('increment', {
        type: "integer"
    })
    stock_id: number;

    @Column({
        type: "text",
        default: ''
    })
    company_name: string;

    @Column({
        type: "text",
        default: '',
    })
    symbol: string;

    @Column({
        type: "text",
        default: '',
    })
    stock_exchanges: string; //Sàn giao dịch

    @Column({
        type: "integer",
        default: 0
    })
    trading_volume: number; //Tổng khổi lượng cổ phiếu

    @Column({
        type: "integer",
        default: 0
    })
    trading_value: number; //Tổng giá trị giao dịch cổ phiếu

    @Column({
        type: "integer",
        default: 0
    })
    foreign_investment_buy: number; //Đầu tư nước ngoài - MUA

    @Column({
        type: "integer",
        default: 0
    })
    foreign_investment_sell: number; //Đầu tư nước ngoài - BÁN

    @Column({
        type: "integer",
        default: 0
    })
    foreign_investment_residual: number; //Đầu tư nước ngoài - DƯ

    @Column({
        type:"integer",
        default: 0
    })
    highest_price: number // Giá trần

    @Column({
        type:"integer",
        default: 0
    })
    lowest_price: number // Giá sàn

    @Column({
        type:"integer",
        default: 0
    })
    original_price: number // Giá gốc

    @Column({
        type:"integer",
        default: 0
    })
    latest_price: number // Giá phiên giao dich gần đây nhất

    @Column({
        type:"smallint",
        default: 1
    })
    is_valid_today: number //Giao dịch hợp lệ trong hôm nay
}