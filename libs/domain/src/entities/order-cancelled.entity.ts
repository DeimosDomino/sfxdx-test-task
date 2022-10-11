import { ChildEntity, DeepPartial } from 'typeorm';
import { EVENT_TYPE, OrderEvent } from './order-event.entity';

@ChildEntity(EVENT_TYPE.ORDER_CANCELLED)
export class OrderCancelled extends OrderEvent {
    constructor(data: DeepPartial<OrderCancelled>) {
        super(data)
    }

}
