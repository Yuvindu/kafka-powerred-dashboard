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
exports.KafkaProducerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaProducerService = class KafkaProducerService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'nestjs-producer',
            brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
    }
    async produceTemperature() {
        const temperature = (Math.random() * 10 + 20).toFixed(2);
        const timestamp = new Date().toISOString();
        const tempMessagePayload = {
            temperature: temperature,
            timestamp: timestamp,
        };
        const messageValue = JSON.stringify(tempMessagePayload);
        await this.producer.send({
            topic: 'temperature-topic',
            messages: [{ value: messageValue }],
        });
        console.log(`Published message: ${messageValue}`);
    }
    async produceHumidity() {
        const humidity = (Math.random() * 50 + 30).toFixed(2);
        const timestamp = new Date().toISOString();
        const humidityMessagePayload = {
            humidity: humidity,
            timestamp: timestamp,
        };
        const messageValue = JSON.stringify(humidityMessagePayload);
        await this.producer.send({
            topic: 'humidity-topic',
            messages: [{ value: messageValue }],
        });
        console.log(`Published message: ${messageValue}`);
    }
    async produceProductCount() {
        const productCount = Math.floor(Math.random() * 100) + 1;
        const timestamp = new Date().toISOString();
        const productMessagePayload = {
            productCount: productCount,
            timestamp: timestamp,
        };
        const messageValue = JSON.stringify(productMessagePayload);
        await this.producer.send({
            topic: 'product-count-topic',
            messages: [{ value: messageValue }],
        });
        console.log(`Published message: ${messageValue}`);
    }
    async startProducer() {
        await this.producer.connect();
    }
    async stop() {
        await this.producer.disconnect();
    }
};
exports.KafkaProducerService = KafkaProducerService;
exports.KafkaProducerService = KafkaProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaProducerService);
//# sourceMappingURL=producer.service.js.map