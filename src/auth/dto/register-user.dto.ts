import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;
}
