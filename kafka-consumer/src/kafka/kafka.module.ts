import { Module } from '@nestjs/common';
import { TemperatureConsumerService } from './temperature-consumer.service';
import { HumidityConsumerService } from './humidity-consumer.service';
import { ProductCountConsumerService } from './product-count-consumer.service';
import { ConsumerService } from './consumer.service';
import { RedisService } from '../redis/redis-service';

@Module({
  providers: [
    TemperatureConsumerService,
    HumidityConsumerService,
    ProductCountConsumerService,
    ConsumerService,
    RedisService,  
  ],
  exports: [ConsumerService],  
})
export class KafkaConsumerModule {}
