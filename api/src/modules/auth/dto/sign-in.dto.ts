import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Admin login', required: true })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Admin password', required: true })
  @IsString()
  password: string;
}
