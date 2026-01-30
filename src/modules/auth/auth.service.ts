import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { AuthAccountsService } from '@/modules/auth-accounts/auth-accounts.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private authAccountService: AuthAccountsService,
    private jwtService: JwtService,
  ) { }

  async googleLogin(googleData: {
    provider: 'google';
    providerId: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl?: string;
    accessToken?: string;
    refreshToken?: string;
  }) {
    var existUser = await this.userService.findByEmail(googleData.email);
    if (!existUser) {
      existUser = await this.userService.create({
        email: googleData.email,
        firstName: googleData.firstName,
        midName: googleData.middleName,
        lastName: googleData.lastName,
        avatarUrl: googleData.avatarUrl,
      });
    }

    var existAccount = await this.authAccountService.upsertOAuthAccount(
      {
        userId: existUser.id,
        provider: 'google',
        providerUserId: googleData.providerId,
        accessToken: googleData.accessToken,
        refreshToken: googleData.refreshToken,
      }
    );

    return {
      userId: existAccount.userId,
      message: 'User registered and logged in successfully',
      accessToken: this.jwtService.sign({ userId: existAccount.id }),
    };
  }
}
