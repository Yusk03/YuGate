import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommandPayDto {
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
  payTimestamp: string;

  @IsNotEmpty()
  @IsString()
  payID: string;

  @IsNotEmpty()
  @IsNumber()
  payElementID: number;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  terminalId: string;
}
