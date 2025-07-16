import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string; // User ID
  email: string; // User email
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET_KEY');
    if (!secret) {
      throw new Error('JWT_SECRET_KEY environment variable is not set.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    // The payload is the decoded JWT. We can add more user details here from the DB if needed.
    return { userId: payload.sub, email: payload.email };
  }
}