import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>
  ) {}

    async findOneByEmail(email: string): Promise<User | null> {
      return this.usersRepository.findOne({ where: { email } });
    }

    async create(registerUserDto: RegisterUserDto): Promise<User> {
      const newUser = this.usersRepository.create(registerUserDto);
      await this.usersRepository.save(newUser);
      return newUser;
    }
}
