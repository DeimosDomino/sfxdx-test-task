import { ApiProperty } from '@nestjs/swagger';



export class OrderDto{

    @ApiProperty({type: String, description: 'ID ордера'})
    id: string;

    @ApiProperty({type: Number, description: 'Количество покумаемых токенов'})
    amountA: number;

    @ApiProperty({type: Number, description: 'Количество продаваемых токенов'})
    amountB: number;

    @ApiProperty({type: Number, description: 'Оставшееся количество токенов для закрытия ордера'})
    amountLeftToFill: number;

    @ApiProperty({type: String, description: 'Адрес покупаемого токена'})
    tokenA: string;

    @ApiProperty({type: String, description: 'Адрес продаваемого токена'})
    tokenB: string;

    @ApiProperty({type: String, description: 'Адрес пользователя'})
    user: string;

    @ApiProperty({type: Boolean, description: 'Отменен ли ордер'})
    isCancelled: boolean;

    @ApiProperty({type: Boolean, description: 'Является ли ордер рыночным'})
    isMarket: boolean;
}