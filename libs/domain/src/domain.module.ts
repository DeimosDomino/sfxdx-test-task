import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from '@libs/config';
import { entities } from './entities';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...CONFIG.DATABASE,
            entities,
        }),
    ],
    providers: [],
    exports: [],
})
export class DomainModule {}
