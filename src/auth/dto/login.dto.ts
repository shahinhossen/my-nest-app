import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email must be a string!' })
  @IsEmail({}, { message: 'Valid Email is Required!' })
  email: string;

  @IsNotEmpty({ message: 'Password Is Required!' })
  @IsString()
  @MinLength(8, { message: 'Password should be minimum 8 char' })
  password: string;
}
