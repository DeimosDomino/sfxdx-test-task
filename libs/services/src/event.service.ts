import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Order,
    OrderCancelled,
    OrderCreated,
    OrderMatched,
} from '@libs/domain';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderCreated)
        private readonly orderCreatedRepository: Repository<OrderCreated>,
        @InjectRepository(OrderCancelled)
        private readonly orderCancelledRepository: Repository<OrderCancelled>,
        @InjectRepository(OrderMatched)
        private readonly orderMatchedRepository: Repository<OrderMatched>,
    ) {}

    /**
     * Создание ордера по событию OrderCreated
     * @param event - событие
     */
    async createOrder(event): Promise<void> {
        await this.orderRepository.save(
            new Order({
                id: event.returnValues.id,
                amountA: parseInt(event.returnValues.amountA),
                amountB: parseInt(event.returnValues.amountB),
                amountLeftToFill: parseInt(event.returnValues.amountA),
                tokenA: event.returnValues.tokenA,
                tokenB: event.returnValues.tokenB,
                user: event.returnValues.user,
                isCancelled: false,
                isMarket: event.returnValues.isMarket,
            }),
        );
        await this.orderCreatedRepository.save(
            new OrderCreated({
                orderId: event.returnValues.id,
                blockNumber: event.blockNumber,
                amountA: parseInt(event.returnValues.amountA),
                amountB: parseInt(event.returnValues.amountB),
                tokenA: event.returnValues.tokenA,
                tokenB: event.returnValues.tokenB,
                user: event.returnValues.user,
                isMarket: event.returnValues.isMarket,
            }),
        );
    }

    /** Обновление ордера по событию OrderMatched */
    async matchOrder(event): Promise<void> {
        const order = await this.orderRepository.findOne({
            where: { id: event.returnValues.id },
        });
        order.amountLeftToFill = event.returnValues.amountLeftToFill;
        await this.orderRepository.save(order);
        await this.orderMatchedRepository.save(
            new OrderMatched({
                orderId: event.returnValues.id,
                blockNumber: event.blockNumber,
                matchedId: event.returnValues.matchedId.matchedId,
                amountReceived: parseInt(event.returnValues.amountReceived),
                amountPaid: parseInt(event.returnValues.amountPaid),
                amountLeftToFill: parseInt(event.returnValues.amountLeftToFill),
            }),
        );
    }

    /**
     * Отмена ордера по событию OrderCancelled
     * @param event
     */
    async cancelOrder(event): Promise<void> {
        const order = await this.orderRepository.findOne({
            where: { id: event.returnValues.id },
        });
        order.isCancelled = true;
        await this.orderRepository.save(order);
        await this.orderCancelledRepository.save(
            new OrderCancelled({
                blockNumber: event.blockNumber,
                orderId: event.returnValues.id
            }),
        );
    }
}
