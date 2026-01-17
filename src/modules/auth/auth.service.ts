import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  signin(signinDto: SigninDto) {
    console.log('Logging in user with email:', signinDto.email);
    return { message: 'User logged in successfully', data: { email: signinDto.email } };
  }
}
