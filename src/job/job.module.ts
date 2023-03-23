import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from 'src/app.service';

@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [JobService, AppService],
})
export class JobModule {}
