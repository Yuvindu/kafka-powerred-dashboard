import { Injectable } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { RedisService } from '../redis/redis-service'; 

@Injectable()
export class ProductCountConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private isInitialized = false; 

  constructor(private readonly redisService: RedisService) {
    this.kafka = new Kafka({
      clientId: 'nestjs-product-count-consumer',
      brokers: ['kafka:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'product-count-group' });
  }

  async startConsumer() {
    if (this.isInitialized) {
      console.warn('ProductCountConsumerService is already initialized');
      return;
    }

    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: 'product-count-topic', fromBeginning: true });
      await this.consumer.run({

        eachMessage: async ({ topic, partition, message }) => {
          const messageValue = message.value?.toString();
          if (!messageValue) {
            console.warn('Received empty message');
            return;
          }

          const parsedMessage = JSON.parse(messageValue);
          const { productCount, timestamp } = parsedMessage;
          await this.redisService.saveProductCount(productCount, timestamp);
  
        },
      });
      
      this.isInitialized = true; 
    } catch (error) {
      console.error('Error starting ProductCountConsumerService', error);
    }
  }

  async stop() {
    if (this.isInitialized) {
      await this.consumer.disconnect();
      this.isInitialized = false; 
    }
  }
}
