export declare class KafkaProducerService {
    private kafka;
    private producer;
    constructor();
    produceTemperature(): Promise<void>;
    produceHumidity(): Promise<void>;
    produceProductCount(): Promise<void>;
    startProducer(): Promise<void>;
    stop(): Promise<void>;
}
