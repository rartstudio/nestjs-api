import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'src/prisma/prisma.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private readonly configService: ConfigService,
    private prisma: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const url = this.configService.get<string>('APP_URL');
    return this.health.check([
      () => this.http.pingCheck('basis check', `${url}/api`),
      () => this.prisma.isHealthy('database'),
    ]);
  }
}
