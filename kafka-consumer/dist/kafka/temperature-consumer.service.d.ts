import { RedisService } from '../redis/redis-service';
export declare class TemperatureConsumerService {
    private readonly redisService;
    private kafka;
    private consumer;
    private isInitialized;
    constructor(redisService: RedisService);
    startConsumer(): Promise<void>;
    stop(): Promise<void>;
}
