import { Injectable } from '@nestjs/common';
import { Cron, Interval  } from '@nestjs/schedule';
import { KafkaProducerService } from './producer.service';

@Injectable()
export class ProducerCronJobService {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @Interval(500)
  async handleTemperatureInterval() {
    await this.kafkaProducerService.produceTemperature();
  }

  @Cron('* * * * * *') 
  async handleHumidityCron() {
    await this.kafkaProducerService.produceHumidity();
  }

  @Cron('*/5 * * * * *') 
  async handleProductCountCron() {
    await this.kafkaProducerService.produceProductCount();
  }
}
