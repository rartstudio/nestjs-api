import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { Job } from './job.type';

@Injectable()
export class JobService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async getJobs(
    description: string | null,
    location: string | null,
    fullTime: boolean,
  ): Promise<Job[]> {
    const url = `${this.configService.get(
      'JOB_URL',
    )}/recruitment/positions.json`;

    const response = this.httpService.get<Job[]>(url).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
    );

    const { data } = await lastValueFrom(response);

    if (description || location) {
      const idsJob: string[] = [];
      if (description) {
        const res: Job[] = data.filter((el: Job) =>
          el.description.replace(/<[^>]*>/g, '').includes(description),
        );
        res.map((el: Job) => idsJob.push(el.id));
      }

      if (location) {
        const res: Job[] = data.filter((el: Job) => el.location == location);
        res.map((el: Job) => idsJob.push(el.id));
      }

      if (fullTime) {
        const res: Job[] = data.filter((el: Job) => el.type == 'Full Time');
        res.map((el: Job) => idsJob.push(el.id));
      }

      const uniqueIdJobs: string[] = [...new Set(idsJob)];

      const result: Job[] = [];

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < uniqueIdJobs.length; j++) {
          if (data[i].id == uniqueIdJobs[j]) {
            result.push(data[i]);
          }
        }
      }

      return result;
    }

    return data;
  }
}
