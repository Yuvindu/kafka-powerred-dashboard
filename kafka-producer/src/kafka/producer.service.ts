import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'nestjs-producer',
      brokers: ['kafka:9092'],
    });
  
    this.producer = this.kafka.producer();
  
    this.producer
      .connect()
      .catch((err) => {
        console.error('cannot connect to kafka', err);
      });
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
  
    console.log(`message: ${messageValue}`);
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
    
    console.log(`message: ${messageValue}`);
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
    
    console.log(`message: ${messageValue}`);
  }
  
  
  async startProducer() {
    await this.producer.connect();
  }

  async stop() {
    await this.producer.disconnect();
  }
}
