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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis-service");
const temperature_service_1 = require("../temperature/temperature.service");
const humidity_service_1 = require("../humidity/humidity.service");
const product_service_1 = require("../product/product.service");
let CacheController = class CacheController {
    constructor(redisService, temperatureService, humidityService, productService) {
        this.redisService = redisService;
        this.temperatureService = temperatureService;
        this.humidityService = humidityService;
        this.productService = productService;
    }
    async getListFromCache(key, start, end, hourEnd) {
        if (!key) {
            throw new common_1.BadRequestException('The "key" query parameter is required.');
        }
        try {
            const startIndex = parseInt(start, 10);
            const minuteEndIndex = parseInt(end, 10);
            const hourEndIndex = parseInt(hourEnd, 10);
            const cachedData = await this.redisService.readListFromCache(key, startIndex, minuteEndIndex);
            const cachedDataForHour = await this.redisService.readListForHourCache(key, startIndex, hourEndIndex);
            if (!cachedData || cachedData.length === 0) {
                return {
                    key,
                    message: 'No data found',
                    range: { start: startIndex, end: minuteEndIndex },
                };
            }
            const response = { key };
            if (key === 'temperature-data') {
                const { avgTemp: avgTempMinute, maxTemp: maxTempMinute } = this.temperatureService.calculateTemperatureStats(cachedData);
                const { avgTemp: avgTempHour, maxTemp: maxTempHour } = this.temperatureService.calculateTemperatureStats(cachedDataForHour);
                return {
                    key,
                    avgTempMinute,
                    maxTempMinute,
                    avgTempHour,
                    maxTempHour,
                };
            }
            else if (key === 'humidity-data') {
                const { avgHumidity: avgHumidityMinute, maxHumidity: maxHumidityMinute } = this.humidityService.calculateHumidityStats(cachedData);
                const { avgHumidity: avgHumidityHour, maxHumidity: maxHumidityHour } = this.humidityService.calculateHumidityStats(cachedDataForHour);
                return {
                    key,
                    avgHumidityMinute,
                    maxHumidityMinute,
                    avgHumidityHour,
                    maxHumidityHour,
                };
            }
            else if (key === 'product-count-data') {
                const { avgProductCount: avgProductCountMinute, maxProductCount: maxProductCountMinute } = this.productService.calculateProductCountStats(cachedData);
                const { avgProductCount: avgProductCountHour, maxProductCount: maxProductCountHour } = this.productService.calculateProductCountStats(cachedDataForHour);
                return {
                    key,
                    avgProductCountMinute,
                    maxProductCountMinute,
                    avgProductCountHour,
                    maxProductCountHour,
                };
            }
            else {
                return {
                    message: 'Invalid Key',
                    key,
                };
            }
            return response;
        }
        catch (error) {
            return {
                message: 'Failed to fetch data',
                error: error.message,
                key,
            };
        }
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('key')),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __param(3, (0, common_1.Query)('hourEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "getListFromCache", null);
exports.CacheController = CacheController = __decorate([
    (0, common_1.Controller)('cache'),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        temperature_service_1.TemperatureService,
        humidity_service_1.HumidityService,
        product_service_1.ProductService])
], CacheController);
//# sourceMappingURL=cache-control.service.js.map