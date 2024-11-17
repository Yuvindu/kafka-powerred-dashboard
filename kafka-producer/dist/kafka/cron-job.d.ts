import { KafkaProducerService } from './producer.service';
export declare class ProducerCronJobService {
    private readonly kafkaProducerService;
    constructor(kafkaProducerService: KafkaProducerService);
    handleTemperatureInterval(): Promise<void>;
    handleHumidityCron(): Promise<void>;
    handleProductCountCron(): Promise<void>;
}
