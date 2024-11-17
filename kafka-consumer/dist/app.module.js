"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_module_1 = require("./kafka/kafka.module");
const app_controller_1 = require("./app.controller");
const cache_control_service_1 = require("./util/cache-control.service");
const redis_service_1 = require("./redis/redis-service");
const temperature_service_1 = require("./temperature/temperature.service");
const humidity_service_1 = require("./humidity/humidity.service");
const product_service_1 = require("./product/product.service");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [kafka_module_1.KafkaConsumerModule],
        controllers: [app_controller_1.AppController, cache_control_service_1.CacheController],
        providers: [app_service_1.AppService, redis_service_1.RedisService, temperature_service_1.TemperatureService, humidity_service_1.HumidityService, product_service_1.ProductService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map