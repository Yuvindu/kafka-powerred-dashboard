"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const consumer_service_1 = require("./kafka/consumer.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:4200',
    });
    const consumerService = app.get(consumer_service_1.ConsumerService);
    await consumerService.startConsumers();
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map