import {
    ChildEntity,
    Column, DeepPartial,
} from 'typeorm';
import { EVENT_TYPE, OrderEvent } from './order-event.entity';

@ChildEntity(EVENT_TYPE.ORDER_CREATED)
export class OrderCreated extends OrderEvent {
    constructor(data: DeepPartial<OrderCreated>) {
        super(data)
    }
    /** Количество покупаемых токенов */
    @Column('decimal', { nullable: false, scale: 32 })
    amountA: number;

    /** Количество продаваемых токенов */
    @Column('decimal', { nullable: false, scale: 32 })
    amountB: number;

    /** Адрес покупаемых токенов */
    @Column('varchar', { nullable: false })
    tokenA: string;

    /** Адрес продаваемых токенов */
    @Column('varchar', { nullable: false })
    tokenB: string;

    /** Адрес пользователя */
    @Column('varchar', { nullable: false })
    user: string;

    /** Является ли ордер рыночным */
    @Column('boolean', { nullable: false })
    isMarket: boolean;
}
