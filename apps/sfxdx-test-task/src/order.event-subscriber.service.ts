import { CONFIG } from '@libs/config';
import 'reflect-metadata';
import 'web3';
import { Inject, Injectable } from '@nestjs/common';
import { EventService } from '@libs/services';
import { Web3EventSubscriber, Event } from '@libs/web3';

@Injectable()
@Web3EventSubscriber({
    abi: CONFIG.WEB3.ABI,
    infura_endpoint: CONFIG.WEB3.INFURA_WSS_ENDPOINT,
    secret_key: CONFIG.WEB3.INFURA_SECRET_KEY,
    contract_address: CONFIG.WEB3.CONTRACT_ADDRESS,
    secret_phrase: CONFIG.WEB3.SECRET_PHRASE,
})
export class OrderEventSubscriber {
    @Inject(EventService) private readonly eventService: EventService;

    /**
     * Обработка события OrderCreated
     * @param event
     */
    @Event('OrderCreated')
    async orderCreated(event): Promise<void> {
        await this.eventService.createOrder(event);
    }

    /**
     * Обработка события OrderMatched
     * @param event
     */
    @Event('OrderMatched')
    async orderMatched(event): Promise<void> {
        await this.eventService.matchOrder(event)
    }

    /**
     * Обработка события OrderCancelled
     * @param event
     */
    @Event('OrderCancelled')
    async orderCancelled(event): Promise<void> {
        await this.eventService.cancelOrder(event)
    }
}
