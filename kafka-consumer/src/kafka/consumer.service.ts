import { Injectable, OnModuleInit } from '@nestjs/common';
import { TemperatureConsumerService } from './temperature-consumer.service';
import { HumidityConsumerService } from './humidity-consumer.service';
import { ProductCountConsumerService } from './product-count-consumer.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private isInitialized = false; 

  constructor(
    private readonly temperatureConsumerService: TemperatureConsumerService,

    private readonly humidityConsumerService: HumidityConsumerService,

    private readonly productCountConsumerService: ProductCountConsumerService,
  ) {}

  async onModuleInit() {
    if (this.isInitialized) {
      console.warn('ConsumerService is already initialized');
      return;
    }

    try {
      await this.startConsumers();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing ConsumerService', error);
    }
  }

  async startConsumers() {
    await this.temperatureConsumerService.startConsumer();
    await this.humidityConsumerService.startConsumer();
    await this.productCountConsumerService.startConsumer();
  }

  async stopConsumers() {
    await this.temperatureConsumerService.stop();
    await this.humidityConsumerService.stop();
    await this.productCountConsumerService.stop();
  }
}
