import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }
}
