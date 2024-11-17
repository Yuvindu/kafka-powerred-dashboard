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
exports.ProducerCronJobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const producer_service_1 = require("./producer.service");
let ProducerCronJobService = class ProducerCronJobService {
    constructor(kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }
    async handleTemperatureInterval() {
        await this.kafkaProducerService.produceTemperature();
    }
    async handleHumidityCron() {
        await this.kafkaProducerService.produceHumidity();
    }
    async handleProductCountCron() {
        await this.kafkaProducerService.produceProductCount();
    }
};
exports.ProducerCronJobService = ProducerCronJobService;
__decorate([
    (0, schedule_1.Interval)(500),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducerCronJobService.prototype, "handleTemperatureInterval", null);
__decorate([
    (0, schedule_1.Cron)('* * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducerCronJobService.prototype, "handleHumidityCron", null);
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducerCronJobService.prototype, "handleProductCountCron", null);
exports.ProducerCronJobService = ProducerCronJobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [producer_service_1.KafkaProducerService])
], ProducerCronJobService);
//# sourceMappingURL=cron-job.js.map