import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  calculateProductCountStats(cachedData: string[]) {
    const productCounts = cachedData.map(item => {
      const parsed = JSON.parse(item);
      return parseInt(parsed.productCount, 10); 
    });

    const avgProductCount = Math.floor(productCounts.reduce((sum, count) => sum + count, 0) / productCounts.length);
    const maxProductCount = Math.max(...productCounts);

    return { avgProductCount, maxProductCount };
  }
}
