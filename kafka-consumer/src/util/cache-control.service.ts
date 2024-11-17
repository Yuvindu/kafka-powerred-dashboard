import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { RedisService } from '../redis/redis-service';
import { TemperatureService } from '../temperature/temperature.service';
import { HumidityService } from '../humidity/humidity.service';
import { ProductService } from '../product/product.service';

@Controller('cache')
export class CacheController {
  constructor(
    private readonly redisService: RedisService,
    private readonly temperatureService: TemperatureService,
    private readonly humidityService: HumidityService,
    private readonly productService: ProductService,
  ) {}

  @Get('list')
  async getListFromCache(
    @Query('key') key: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('hourEnd') hourEnd: string,
  ) {
    if (!key) {
      throw new BadRequestException('key is required');
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
        
      } else if (key === 'humidity-data') {
        const { avgHumidity: avgHumidityMinute, maxHumidity: maxHumidityMinute } = this.humidityService.calculateHumidityStats(cachedData);
    
        const { avgHumidity: avgHumidityHour, maxHumidity: maxHumidityHour } = this.humidityService.calculateHumidityStats(cachedDataForHour);
        
        return {
          key,
          avgHumidityMinute,
          maxHumidityMinute,
          avgHumidityHour,
          maxHumidityHour,

        };
        
      } else if (key === 'product-count-data') {
        const { avgProductCount: avgProductCountMinute, maxProductCount: maxProductCountMinute } = this.productService.calculateProductCountStats(cachedData);
        
        const { avgProductCount: avgProductCountHour, maxProductCount: maxProductCountHour } = this.productService.calculateProductCountStats(cachedDataForHour);
        
        return {
          key,
          avgProductCountMinute,
          maxProductCountMinute,
          avgProductCountHour,
          maxProductCountHour,

        };
        
      } else {
        return {
          message: 'Invalid Key',
          key,
        };
      }

      return response;
    } catch (error) {
      return {
        message: 'Failed to fetch data',
        error: error.message,
        key,
      };
    }
  }
}
