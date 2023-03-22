import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.number().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JOB_URL: Joi.string().required(),
      }),
    }),
    HttpModule,
    PrismaModule,
    AuthModule,
    JobModule,
    UserModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
