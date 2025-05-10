import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommandCancelDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  command: string;

  @IsNotEmpty()
  @IsString()
  transactionID: string;

  @IsNotEmpty()
  @IsString()
  cancelPayID: string;

  @IsNotEmpty()
  @IsNumber()
  payElementID: number;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
