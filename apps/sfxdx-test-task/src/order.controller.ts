import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Query, ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from '@libs/domain';
import { ApiQuery } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';

@Controller()
export class OrderController {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    /**
     * Возвращает массив заявок по заданным параметрам
     * @param tokenA - адрес покупаемых токенов
     * @param tokenB - адрес продаваемых токенов
     * @param user - адрес пользователя
     * @param active - активность ордера
     */
    @ApiQuery({
        type: String,
        name: 'tokenA',
        required: false,
        description: 'Адрес покупаемых токенов',
    })
    @ApiQuery({
        type: String,
        name: 'tokenB',
        required: false,
        description: 'Адрес продаваемых токенов',
    })
    @ApiQuery({
        type: String,
        name: 'user',
        required: false,
        description: 'Адрес пользователя',
    })
    @ApiQuery({
        type: Boolean,
        name: 'active',
        required: false,
        description: 'Активность',
    })
    @Get('getOrders')
    async getOrders(
        @Query('tokenA') tokenA: string,
        @Query('tokenB') tokenB: string,
        @Query('user') user: string,
        @Query('active') active: boolean = true,
    ): Promise<OrderDto[]> {
        return await this.orderRepository.find({
            where: {
                tokenA,
                tokenB,
                user,
                isCancelled: !active,
            },
        });
    }

    /**
     * Возвращает массив идентификаторов заявок, для вызова метода matchOrders в смарт контракте
     * @param tokenA - адрес покупаемых токенов
     * @param tokenB - адрес продаваемых токенов
     * @param amountA - количество покупаемых токенов
     * @param amountB - количество продаваемых токенов
     */
    @ApiQuery({
        type: String,
        name: 'tokenA',
        required: false,
        description: 'Адрес покупаемых токенов',
    })
    @ApiQuery({
        type: String,
        name: 'tokenB',
        required: false,
        description: 'Адрес продаваемых токенов',
    })
    @ApiQuery({
        type: Number,
        name: 'amountA',
        required: false,
        description: 'Количество покупаемых токенов',
    })
    @ApiQuery({
        type: Number,
        name: 'amountB',
        required: false,
        description: 'Количество продаваемых токенов',
    })
    @Get('getMatchingOrders')
    async getMatchingOrders(
        @Query('tokenA') tokenA: string,
        @Query('tokenB') tokenB: string,
        @Query('amountA') amountA: number,
        @Query('amountB') amountB: number,
    ): Promise<OrderDto[]> {
        if (tokenA === tokenB)
            throw new HttpException(
                'tokenA и tokenB не должны быть равны',
                HttpStatus.BAD_REQUEST,
            );
        return (
            await this.orderRepository.find({
                where: { tokenA: tokenB, tokenB: tokenA, isCancelled: false },
            })
        ).filter((order) => amountA * order.amountA <= amountB * order.amountB);
    }
}
