/**
 * Декоратор, отмечающий метод, который будет обрабатывать событие смарт-контракта
 * @param contractEvent - событие контракта
 * @param optionalEvent - опциональное событие
 * @constructor
 */
export const Event = (
    contractEvent: string,
    optionalEvent: 'data' | 'changed' | 'error' | 'connected' = 'data',
) => {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>,
    ): TypedPropertyDescriptor<any> => {
        if (!Reflect.hasMetadata('eventHandlers', target))
            Reflect.defineMetadata('eventHandlers', [], target);
        Reflect.getMetadata('eventHandlers', target).push(({fn: descriptor, contractEvent, optionalEvent}));
        return descriptor;
    };
};