import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    // extract out object from dto
    const { username, password } = loginDto;

    // check user email
    const user = await this.userService.findOneByUsername(username);
    if (user == null) {
      throw new BadRequestException({ username: ["Username doesn't exist"] });
    }

    // check user password
    const validatedPassword = await this.userService.verify(
      user.password,
      password,
    );
    if (!validatedPassword) {
      throw new BadRequestException({
        username: ["Email and Password doesn't match"],
      });
    }

    // generate and return token
    const { accessToken, refreshToken } = await this.authService.login(user);

    return {
      data: {
        accessToken,
        refreshToken,
      },
      message: 'Login Success',
    };
  }
}
