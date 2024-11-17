import { Injectable } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { RedisService } from '../redis/redis-service'; 

@Injectable()
export class HumidityConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private isInitialized = false; 
  

  constructor(private readonly redisService: RedisService) {
    this.kafka = new Kafka({
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
    } catch (error) {
      console.error('Error starting HumidityConsumerService', error);
    }
  }

  async stop() {
    if (this.isInitialized) {
      try {
        await this.consumer.disconnect();
      } catch (error) {
        console.error('Error stopping HumidityConsumerService', error);
      } finally {
        this.isInitialized = false; 
      }
    }
  }
}
