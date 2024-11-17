"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerModule = void 0;
const common_1 = require("@nestjs/common");
const temperature_consumer_service_1 = require("./temperature-consumer.service");
const humidity_consumer_service_1 = require("./humidity-consumer.service");
const product_count_consumer_service_1 = require("./product-count-consumer.service");
const consumer_service_1 = require("./consumer.service");
const redis_service_1 = require("../redis/redis-service");
let KafkaConsumerModule = class KafkaConsumerModule {
};
exports.KafkaConsumerModule = KafkaConsumerModule;
exports.KafkaConsumerModule = KafkaConsumerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            temperature_consumer_service_1.TemperatureConsumerService,
            humidity_consumer_service_1.HumidityConsumerService,
            product_count_consumer_service_1.ProductCountConsumerService,
            consumer_service_1.ConsumerService,
            redis_service_1.RedisService,
        ],
        exports: [consumer_service_1.ConsumerService],
    })
], KafkaConsumerModule);
//# sourceMappingURL=kafka.module.js.map