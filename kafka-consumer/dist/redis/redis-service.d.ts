export declare class RedisService {
    private redis;
    constructor();
    saveTemperature(temperature: string, timestamp: string): Promise<void>;
    saveHumidity(humidity: string, timestamp: string): Promise<void>;
    saveProductCount(productCount: string, timestamp: string): Promise<void>;
    readListFromCache(key: string, start: number, end: number): Promise<string[]>;
    readListForHourCache(key: string, start: number, hourEnd: number): Promise<string[]>;
}
