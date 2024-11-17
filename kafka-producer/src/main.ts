import { NestFactory } from '@nestjs/core';
import { KafkaModule } from './kafka/kafka.module'; 
import { KafkaProducerService } from './kafka/producer.service'; 

async function bootstrap() {
  const app = await NestFactory.create(KafkaModule);  
  const producerService = app.get(KafkaProducerService);  

  await producerService.startProducer();

  await app.listen(3000, () => {
  });
}

bootstrap();
