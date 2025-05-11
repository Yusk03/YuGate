import { IsNotEmpty, IsString } from 'class-validator';

export class CommandCheckStatusDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  command: string = 'check_status';

  @IsNotEmpty()
  @IsString()
  transactionID: string;

  @IsNotEmpty()
  @IsString()
  PayID: string;
}
