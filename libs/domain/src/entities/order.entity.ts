import {
    Column,
    DeepPartial,
    Entity,
    Index,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { OrderEvent } from './order-event.entity';

@Entity()
export class Order{

    constructor(data: DeepPartial<Order>) {
        Object.assign(this, data)
    }

    /** ID ордера */
    @Index()
    @PrimaryColumn()
    id: string;

    /** Количество покупаемых токенов */
    @Column('decimal', { nullable: false, scale: 32 })
    amountA: number;

    /** Количество продаваемых токенов */
    @Column('decimal', { nullable: false, scale: 32 })
    amountB: number;

    /** Оставшееся количество токенов для закрытия ордера */
    @Column('decimal', { nullable: false, scale: 32 })
    amountLeftToFill: number;

    /** Адрес покупаемого токена */
    @Column('varchar', { nullable: false })
    tokenA: string;

    /** Адрес продаваемого токена */
    @Column('varchar', { nullable: false })
    tokenB: string;

    /** Адрес пользователя */
    @Column('varchar', { nullable: false })
    user: string;

    /** Отменен ли ордер */
    @Column('boolean', { nullable: false })
    isCancelled: boolean;

    /** Является ли ордер рыночным */
    @Column('boolean', { nullable: false })
    isMarket: boolean;

    /** Связь с событиями ордера */
    @OneToMany(() => OrderEvent, (orderEvent) => orderEvent.order, {
        nullable: true,
    })
    events: OrderEvent[];
}
