import { ChildEntity, Column, DeepPartial } from 'typeorm';
import { EVENT_TYPE, OrderEvent } from './order-event.entity';

@ChildEntity(EVENT_TYPE.ORDER_MATCHED)
export class OrderMatched extends OrderEvent {
    constructor(data: DeepPartial<OrderMatched>) {
        super(data);
    }

    /** ID выполнивщего ордера */
    @Column('varchar', { nullable: false })
    matchedId: string;

    /** Полученное количество */
    @Column('decimal', { nullable: false, scale: 32 })
    amountReceived: number;

    /** Оплаченное количество */
    @Column('decimal', { nullable: false, scale: 32 })
    amountPaid: number;

    /** Оставшееся количество токенов для закрытия ордера */
    @Column('decimal', { nullable: false, scale: 32 })
    amountLeftToFill: number;

    /** Цена исполнения */
    @Column('decimal', { nullable: false, scale: 32 })
    fee: number;

    /** Цена исполнения */
    @Column('decimal', { nullable: false, scale: 32 })
    feeRate: number;
}
