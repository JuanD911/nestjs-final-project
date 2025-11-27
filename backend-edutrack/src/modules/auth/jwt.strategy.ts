import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({secretOrKey: process.env.JWT_SECRET!, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()});
  }

  async validate(payload: any) {
    console.log("Petición autenticada por:", payload);
    return { id: payload.id, role: payload.role };
  }
}
