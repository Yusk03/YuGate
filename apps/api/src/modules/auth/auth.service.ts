import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<{ accessToken: string }> {
    const admin = await this.adminsService.findOne(login);
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.id, login: admin.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
