import { ApiProperty } from '@nestjs/swagger';

export class SignInEntity {
  @ApiProperty({ description: 'Access token on API' })
  accessToken: string;
}
