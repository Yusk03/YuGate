import { Module } from '@nestjs/common';
import { AbillsService } from './abills.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AbillsService],
  exports: [AbillsService],
})
export class AbillsModule {}
