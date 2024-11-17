import { Injectable } from '@nestjs/common';

@Injectable()
export class TemperatureService {
  calculateTemperatureStats(cachedData: string[]) {
    const temperatures = cachedData.map(item => {
      const parsed = JSON.parse(item);
      return parseFloat(parsed.temperature);
    });

    const avgTemp = (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(2);
    const maxTemp = Math.max(...temperatures);

    return { avgTemp, maxTemp };
  }
}
