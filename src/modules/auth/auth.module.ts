import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '@/modules/auth/passport/google.strategy';
import { AuthAccountsModule } from '@/modules/auth-accounts/auth-accounts.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    AuthAccountsModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule { }
