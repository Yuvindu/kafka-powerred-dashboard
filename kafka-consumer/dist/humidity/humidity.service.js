"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumidityService = void 0;
const common_1 = require("@nestjs/common");
let HumidityService = class HumidityService {
    calculateHumidityStats(cachedData) {
        const humidities = cachedData.map(item => {
            const parsed = JSON.parse(item);
            return parseFloat(parsed.humidity);
        });
        const avgHumidity = (humidities.reduce((sum, temp) => sum + temp, 0) / humidities.length).toFixed(2);
        const maxHumidity = Math.max(...humidities);
        return { avgHumidity, maxHumidity };
    }
};
exports.HumidityService = HumidityService;
exports.HumidityService = HumidityService = __decorate([
    (0, common_1.Injectable)()
], HumidityService);
//# sourceMappingURL=humidity.service.js.map