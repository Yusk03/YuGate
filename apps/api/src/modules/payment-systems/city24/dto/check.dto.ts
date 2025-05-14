import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommandCheckDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  command: string = 'check';

  @IsNotEmpty()
  @IsString()
  transactionID: string;

  @IsNotEmpty()
  @IsString()
  payElementID: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsString()
  payID: string;

  @IsNotEmpty()
  @IsNumber()
  userEnterAmount: number;
}
