import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User, UserDto } from 'src/users/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService, 
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<{id: string, email: string}> {
    const user = await this.usersService.create(registerUserDto);
    const { password, hashPassword, ...result } = user;
    return result;
  }
}
