import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { CommandCancelDto } from './cancel.dto';
import { CommandCheckDto } from './check.dto';
import { CommandPayDto } from './pay.dto';
import { CommandCheckStatusDto } from './check-status.dto';

export class City24Dto {
  @ValidateNested()
  @Type(() => Object)
  @IsNotEmptyObject()
  commandCall:
    | CommandCancelDto
    | CommandCheckDto
    | CommandPayDto
    | CommandCheckStatusDto;
}
