import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { AuthAccountsService } from '@/modules/auth-accounts/auth-accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private authAccountService: AuthAccountsService
  ) { }

  async googleLogin(googleData: {
    provider: 'google';
    providerId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    accessToken?: string;
    refreshToken?: string;
  }) {
    var existAccount = await this.authAccountService.findByProviderAndProviderId(
      googleData.provider,
      googleData.providerId
    );

    if (existAccount) {
      return {
        userId: existAccount.userId,
        message: 'User logged in successfully',
      };
    }

    var existUser = await this.userService.findByEmail(googleData.email);

    if (!existUser) {
      existUser = await this.userService.create({
        email: googleData.email,
        firstName: googleData.fullName,
        avatarUrl: googleData.avatarUrl,
      });
    }
    await this.authAccountService.create({
      userId: existUser.id,
      provider: googleData.provider,
      providerUserId: googleData.providerId,
      accessToken: googleData.accessToken,
      refreshToken: googleData.refreshToken,
    });

    return {
      userId: existUser.id,
      message: 'User registered and logged in successfully',
    };
  }
}
