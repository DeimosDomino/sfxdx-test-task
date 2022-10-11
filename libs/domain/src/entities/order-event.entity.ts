import {
    Column, DeepPartial,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    TableInheritance,
} from 'typeorm';
import { Order } from './order.entity';

/**
 * Типы событий
 */
export enum EVENT_TYPE {
    ORDER_CREATED = 'ORDER_CREATED',
    ORDER_CANCELLED = 'ORDER_CANCELLED',
    ORDER_MATCHED = 'ORDER_MATCHED',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class OrderEvent {
    constructor(data: DeepPartial<OrderEvent>) {
        Object.assign(this, data)
    }
    /** ID события */
    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** Тип события */
    @Column('varchar', { nullable: false })
    type: EVENT_TYPE;

    /** Номер блока */
    @Column('integer', { nullable: false })
    blockNumber: number;

    /** ID ордера */
    @Column('varchar', { nullable: false })
    orderId: string;

    /** Связь с ордером */
    @ManyToOne(() => Order, (order) => order.events, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false
    })
    order: Order;
}
