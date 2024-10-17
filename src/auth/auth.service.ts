import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    console.log(user);
    if (!await this.isCorrectPassword(pass, user.passhash)) {
      throw new UnauthorizedException();
    }
    const payload = {
      user_id: user.user_id,
      email: user.email,
      role_id: user.role_id,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async isCorrectPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}