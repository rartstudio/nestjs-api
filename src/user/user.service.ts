import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOneByUsername(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { username },
    });
  }

  async verify(hash: string, plain: string): Promise<boolean> {
    return await argon.verify(hash, plain);
  }
}
