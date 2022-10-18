import { Inject, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderEventSubscriber } from './order.event-subscriber.service';
import {
    DomainModule,
    entities,
    Order,
    OrderCancelled,
    OrderCreated,
    OrderMatched,
    OrderEvent,
} from '@libs/domain';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { IsNull, Not, Repository } from 'typeorm';
import { CONFIG } from '@libs/config';
import { EventService, ServicesModule } from '@libs/services';

const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require('web3');

@Module({
    imports: [DomainModule, TypeOrmModule.forFeature(entities), ServicesModule],
    controllers: [OrderController],
    providers: [OrderEventSubscriber],
})
export class AppModule {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderEvent)
        private readonly orderEventRepository: Repository<OrderEvent>,
        @Inject(EventService) private readonly eventService: EventService,
    ) {
        Promise.all([
            this.orderRepository.delete({ id: Not(IsNull()) }),
            this.orderEventRepository.delete({ id: Not(IsNull()) }),
        ]).then(() => this.updateDB());
    }

    /**
     * Запрашивает все прошедшие события и по ним обновляет базу данных
     * @private
     */
    private async updateDB(): Promise<void> {
        const provider = new HDWalletProvider(
            CONFIG.WEB3.SECRET_PHRASE,
            CONFIG.WEB3.INFURA_HTTPS_ENDPOINT,
        );
        const w3: Web3 = new web3(provider);
        const contract = new w3.eth.Contract(
            CONFIG.WEB3.ABI,
            CONFIG.WEB3.CONTRACT_ADDRESS,
        );
        const orderCreatedEvents = await contract.getPastEvents(
            'OrderCreated',
            { fromBlock: 'earliest' },
        );
        const orderMatchedEvents = await contract.getPastEvents(
            'OrderMatched',
            { fromBlock: 'earliest' },
        );
        const orderCancelledEvents = await contract.getPastEvents(
            'OrderCancelled',
            { fromBlock: 'earliest' },
        );

        const events = [
            ...orderCreatedEvents,
            ...orderMatchedEvents,
            ...orderCancelledEvents,
        ].sort((a, b) => {
            if (a.blockNumber > b.blockNumber) return 1;
            if (a.blockNumber < b.blockNumber) return -1;
            return 0;
        });

        for (const event of events) {
            switch (event.event) {
                case 'OrderCreated':
                    await this.eventService.createOrder(event);
                    break;
                case 'OrderMatched':
                    await this.eventService.matchOrder(event);
                    break;
                case 'OrderCancelled':
                    await this.eventService.cancelOrder(event);
                    break;
                default:
                    break;
            }
        }
    }
}
