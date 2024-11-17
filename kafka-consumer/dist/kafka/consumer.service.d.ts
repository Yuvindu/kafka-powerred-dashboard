import { OnModuleInit } from '@nestjs/common';
import { TemperatureConsumerService } from './temperature-consumer.service';
import { HumidityConsumerService } from './humidity-consumer.service';
import { ProductCountConsumerService } from './product-count-consumer.service';
export declare class ConsumerService implements OnModuleInit {
    private readonly temperatureConsumerService;
    private readonly humidityConsumerService;
    private readonly productCountConsumerService;
    private isInitialized;
    constructor(temperatureConsumerService: TemperatureConsumerService, humidityConsumerService: HumidityConsumerService, productCountConsumerService: ProductCountConsumerService);
    onModuleInit(): Promise<void>;
    startConsumers(): Promise<void>;
    stopConsumers(): Promise<void>;
}
