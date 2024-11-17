import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './kafka/kafka.module';  
import { AppController } from './app.controller';
import { CacheController } from './util/cache-control.service';
import { RedisService } from './redis/redis-service';
import { TemperatureService } from './temperature/temperature.service';
import { HumidityService } from './humidity/humidity.service';
import { ProductService } from './product/product.service';
import { AppService } from './app.service';

@Module({
  imports: [KafkaConsumerModule],  
  controllers: [AppController, CacheController],
  providers: [AppService, RedisService, TemperatureService, HumidityService, ProductService],  
})
export class AppModule {}
