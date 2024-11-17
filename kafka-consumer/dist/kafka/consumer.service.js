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
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const temperature_consumer_service_1 = require("./temperature-consumer.service");
const humidity_consumer_service_1 = require("./humidity-consumer.service");
const product_count_consumer_service_1 = require("./product-count-consumer.service");
let ConsumerService = class ConsumerService {
    constructor(temperatureConsumerService, humidityConsumerService, productCountConsumerService) {
        this.temperatureConsumerService = temperatureConsumerService;
        this.humidityConsumerService = humidityConsumerService;
        this.productCountConsumerService = productCountConsumerService;
        this.isInitialized = false;
    }
    async onModuleInit() {
        if (this.isInitialized) {
            console.warn('ConsumerService is already initialized');
            return;
        }
        try {
            await this.startConsumers();
            this.isInitialized = true;
        }
        catch (error) {
            console.error('Error initializing ConsumerService', error);
        }
    }
    async startConsumers() {
        await this.temperatureConsumerService.startConsumer();
        await this.humidityConsumerService.startConsumer();
        await this.productCountConsumerService.startConsumer();
    }
    async stopConsumers() {
        await this.temperatureConsumerService.stop();
        await this.humidityConsumerService.stop();
        await this.productCountConsumerService.stop();
    }
};
exports.ConsumerService = ConsumerService;
exports.ConsumerService = ConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [temperature_consumer_service_1.TemperatureConsumerService,
        humidity_consumer_service_1.HumidityConsumerService,
        product_count_consumer_service_1.ProductCountConsumerService])
], ConsumerService);
//# sourceMappingURL=consumer.service.js.map