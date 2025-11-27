import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    if (user.role !== 'Admin') {
      throw new UnauthorizedException('Only admin users can access the application');
    }

    const payload = { id: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
