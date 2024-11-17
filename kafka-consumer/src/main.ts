import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsumerService } from './kafka/consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.enableCors();

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  const consumerService = app.get(ConsumerService); 
  await consumerService.startConsumers(); 

  await app.listen(3001);
}
bootstrap();
