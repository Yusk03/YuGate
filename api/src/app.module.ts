import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsService } from './admins/admins.service';
import { AdminsModule } from './admins/admins.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AdminsModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AdminsService, AuthService],
})
export class AppModule {}
