"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor() {
        this.redis = new ioredis_1.Redis({
            host: 'localhost',
            port: 6379,
        });
    }
    async saveTemperature(temperature, timestamp) {
        const key = 'temperature-data';
        const value = JSON.stringify({ temperature, timestamp });
        const pipeline = this.redis.pipeline();
        pipeline.lpush(key, value);
        await pipeline.exec();
        console.log(`Saved to Redis list: ${key} - ${value}`);
    }
    async saveHumidity(humidity, timestamp) {
        const key = 'humidity-data';
        const value = JSON.stringify({ humidity, timestamp });
        const pipeline = this.redis.pipeline();
        pipeline.lpush(key, value);
        await pipeline.exec();
        console.log(`Saved to Redis: ${key} - ${value}`);
    }
    async saveProductCount(productCount, timestamp) {
        const key = 'product-count-data';
        const value = JSON.stringify({ productCount, timestamp });
        const pipeline = this.redis.pipeline();
        pipeline.lpush(key, value);
        await pipeline.exec();
        console.log(`Saved to Redis: ${key} - ${value}`);
    }
    async readListFromCache(key, start, end) {
        try {
            return await this.redis.lrange(key, start, end);
        }
        catch (error) {
            throw new Error(`Failed to read`);
        }
    }
    async readListForHourCache(key, start, hourEnd) {
        try {
            const listLength = await this.redis.llen(key);
            const end = hourEnd > listLength ? listLength - 1 : hourEnd;
            return await this.redis.lrange(key, start, end);
        }
        catch (error) {
            throw new Error(`Failed to read: ${error.message}`);
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis-service.js.map