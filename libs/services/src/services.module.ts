import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@libs/domain';

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: [EventService],
    exports: [EventService],
})
export class ServicesModule {}
