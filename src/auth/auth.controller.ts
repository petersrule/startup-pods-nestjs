import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto, User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
