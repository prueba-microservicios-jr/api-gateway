import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {

    if(username !== 'admin' || password !== '123456'){
      return null;
    }

    const user = { username: 'admin', password: await bcrypt.hash('123456', 10) };
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
