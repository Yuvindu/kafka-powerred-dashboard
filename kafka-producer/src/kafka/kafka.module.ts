import { Module } from '@nestjs/common';
import { KafkaProducerService } from './producer.service';
import { ProducerCronJobService } from './cron-job';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [KafkaProducerService, ProducerCronJobService],
})
export class KafkaModule {}
