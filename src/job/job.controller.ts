import {
  Controller,
  UseGuards,
  Get,
  HttpCode,
  Query,
  ParseBoolPipe,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User as UserEntity } from '@prisma/client';
import { User } from 'src/user/user.decorator';
import { JobService } from './job.service';
import { AppService } from 'src/app.service';

@Controller('jobs')
@ApiTags('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JobController {
  constructor(private jobService: JobService, private appService: AppService) {}

  @Get('/')
  @HttpCode(200)
  @ApiQuery({ type: String, name: 'description', required: false })
  @ApiQuery({ type: String, name: 'full_time', required: false })
  @ApiQuery({ type: String, name: 'location', required: false })
  @ApiQuery({ type: Number, name: 'page', required: false })
  async getAll(
    @User() user: UserEntity,
    @Query('description') description: string | null,
    @Query('location') location: string | null,
    @Query('full_time', ParseBoolPipe) fullTime: boolean,
    @Query('page') page: number | null,
  ) {
    const result = await this.jobService.getJobs(
      description,
      location,
      fullTime,
    );

    if (page) {
      const slices = result.slice(page * 4, (page + 1) * 4);
      return {
        page,
        data: slices,
        message: 'Success get all jobs',
      };
    } else {
      const slices = result.slice(0, 4);
      return {
        page: 1,
        data: slices,
        message: 'Success get all jobs',
      };
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async get(@Param('id') id: string) {
    const result = await this.jobService.getJob(id);

    return {
      data: result,
      message: `Success get job`,
    };
  }
}
