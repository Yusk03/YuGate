import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const admin = await this.adminsService.findOne(login);

    const isPasswordValid = await compare(password, admin?.password);

    if (!admin?.login || !isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: admin.id, login: admin.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
