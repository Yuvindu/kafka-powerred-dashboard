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
exports.HumidityConsumerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const redis_service_1 = require("../redis/redis-service");
let HumidityConsumerService = class HumidityConsumerService {
    constructor(redisService) {
        this.redisService = redisService;
        this.isInitialized = false;
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'nestjs-humidity-consumer',
            brokers: ['kafka:9092'],
        });
        this.consumer = this.kafka.consumer({ groupId: 'humidity-group' });
    }
    async startConsumer() {
        if (this.isInitialized) {
            console.warn('HumidityConsumerService is already initialized');
            return;
        }
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: 'humidity-topic', fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const messageValue = message.value?.toString();
                    if (!messageValue) {
                        console.warn('Received empty message');
                        return;
                    }
                    const parsedMessage = JSON.parse(messageValue);
                    const { humidity, timestamp } = parsedMessage;
                    await this.redisService.saveHumidity(humidity, timestamp);
                },
            });
            this.isInitialized = true;
        }
        catch (error) {
            console.error('Error starting HumidityConsumerService', error);
        }
    }
    async stop() {
        if (this.isInitialized) {
            try {
                await this.consumer.disconnect();
            }
            catch (error) {
                console.error('Error stopping HumidityConsumerService', error);
            }
            finally {
                this.isInitialized = false;
            }
        }
    }
};
exports.HumidityConsumerService = HumidityConsumerService;
exports.HumidityConsumerService = HumidityConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], HumidityConsumerService);
//# sourceMappingURL=humidity-consumer.service.js.map