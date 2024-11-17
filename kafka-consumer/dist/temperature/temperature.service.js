"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureService = void 0;
const common_1 = require("@nestjs/common");
let TemperatureService = class TemperatureService {
    calculateTemperatureStats(cachedData) {
        const temperatures = cachedData.map(item => {
            const parsed = JSON.parse(item);
            return parseFloat(parsed.temperature);
        });
        const avgTemp = (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(2);
        const maxTemp = Math.max(...temperatures);
        return { avgTemp, maxTemp };
    }
};
exports.TemperatureService = TemperatureService;
exports.TemperatureService = TemperatureService = __decorate([
    (0, common_1.Injectable)()
], TemperatureService);
//# sourceMappingURL=temperature.service.js.map