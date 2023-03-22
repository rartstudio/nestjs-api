import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: `Email can't be empty` })
  @IsEmail({}, { message: `Please Enter a Valid Email` })
  @ApiProperty()
  @MaxLength(100, { message: `Email can't more than 100 characters` })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: `Username can't be empty` })
  @ApiProperty()
  @MaxLength(100, { message: `Username can't more than 100 characters` })
  public username: string;

  @IsString()
  @IsNotEmpty({ message: `Name can't be empty` })
  @ApiProperty()
  @MaxLength(50, { message: `Name can't more than 50 characters` })
  public name: string;

  @IsString()
  @MinLength(8, { message: `Password must at least 8 characters` })
  @MaxLength(20, { message: `Password can't more than 20 characters` })
  @IsNotEmpty({ message: `Password can't be empty` })
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must be contain uppercase, lowercase, number, and symbol',
  })
  @ApiProperty()
  public password: string;
}
