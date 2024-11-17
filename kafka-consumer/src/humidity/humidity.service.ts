import { Injectable } from '@nestjs/common';

@Injectable()
export class HumidityService {
  calculateHumidityStats(cachedData: string[]) {
    const humidities = cachedData.map(item => {
      const parsed = JSON.parse(item);
      return parseFloat(parsed.humidity);
    });

    const avgHumidity = (humidities.reduce((sum, temp) => sum + temp, 0) / humidities.length).toFixed(2);
    const maxHumidity = Math.max(...humidities);

    return { avgHumidity, maxHumidity };
  }
}
