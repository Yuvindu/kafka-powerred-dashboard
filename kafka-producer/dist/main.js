"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const kafka_module_1 = require("./kafka/kafka.module");
const producer_service_1 = require("./kafka/producer.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(kafka_module_1.KafkaModule);
    const producerService = app.get(producer_service_1.KafkaProducerService);
    await producerService.startProducer();
    await app.listen(3000, () => {
    });
}
bootstrap();
//# sourceMappingURL=main.js.map