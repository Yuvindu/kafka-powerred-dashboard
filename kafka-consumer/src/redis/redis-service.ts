import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'redis',
      port: 6379, 
    });
  }

  async saveTemperature(temperature: string, timestamp: string) {
    const key = 'temperature-data';
    const value = JSON.stringify({ temperature, timestamp });
  
    const pipeline = this.redis.pipeline();
    pipeline.lpush(key, value);
    await pipeline.exec();
    console.log(`Saved to Redis list: ${key} - ${value}`);
  
    //await this.trimOldData(key);
  }
  
  async saveHumidity(humidity: string, timestamp: string) {
    const key = 'humidity-data';
    const value = JSON.stringify({ humidity, timestamp });
  
    const pipeline = this.redis.pipeline();
    pipeline.lpush(key, value);
    await pipeline.exec();
  
    console.log(`Saved to Redis: ${key} - ${value}`);
  }
  
  async saveProductCount(productCount: string, timestamp: string) {
    const key = 'product-count-data';
    const value = JSON.stringify({ productCount, timestamp });
  
    const pipeline = this.redis.pipeline();
    pipeline.lpush(key, value);
    await pipeline.exec();
  
    console.log(`Saved to Redis: ${key} - ${value}`);
  }

  async readListFromCache(key: string, start: number, end: number): Promise<string[]> {
    try {
      return await this.redis.lrange(key, start, end);
    } catch (error) {
      throw new Error(`Failed to read`);
    }
  }
  
  async readListForHourCache(key: string, start: number, hourEnd: number): Promise<string[]> {
    try {
      const listLength = await this.redis.llen(key);
      const end = hourEnd > listLength ? listLength - 1 : hourEnd;
      return await this.redis.lrange(key, start, end);
    } catch (error) {
      throw new Error(`Failed to read: ${error.message}`);
    }
  }
  
}
