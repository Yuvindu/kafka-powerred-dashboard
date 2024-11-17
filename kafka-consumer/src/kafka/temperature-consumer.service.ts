// temperature-consumer.service.ts
import { Injectable } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { RedisService } from '../redis/redis-service'; 

@Injectable()
export class TemperatureConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private isInitialized = false;

  constructor(private readonly redisService: RedisService) {
    this.kafka = new Kafka({
      clientId: 'nestjs-temperature-consumer',
      brokers: ['kafka:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'temperature-group' });
  }

  async startConsumer() {
    if (this.isInitialized) {
      console.warn('TemperatureConsumerService is already initialized');
      return;
    }

    try {
      await this.consumer.connect();

      await this.consumer.subscribe({ topic: 'temperature-topic', fromBeginning: true });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          
            const messageValue = message.value?.toString();
            if (!messageValue) {
              console.warn('Received an empty message');
              return;
            }
      
            const parsedMessage = JSON.parse(messageValue);
            const { temperature, timestamp } = parsedMessage;
            await this.redisService.saveTemperature(temperature, timestamp);

        },
      });
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error starting TemperatureConsumerService', error);
    }
  }

  async stop() {
    if (this.isInitialized) {
      try {
        await this.consumer.disconnect();
      } catch (error) {
        console.error('Error stopping TemperatureConsumerService', error);
      } finally {
        this.isInitialized = false;
      }
    }
  }
}
