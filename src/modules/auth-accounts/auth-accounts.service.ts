import { Injectable } from '@nestjs/common';
import { CreateAuthAccountDto } from './dto/create-auth-account.dto';
import { UpdateAuthAccountDto } from './dto/update-auth-account.dto';
import { AuthAccount } from '@/modules/auth-accounts/schemas/auth-account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthAccountsService {
  constructor(
    @InjectModel(AuthAccount.name) private authAccountModel: Model<AuthAccount>,
  ) { }

  async create(createAuthAccountDto: CreateAuthAccountDto) {
    const { provider, providerUserId, userId, accessToken, refreshToken } = { ...createAuthAccountDto };
    return await this.authAccountModel.create({
      provider: 'google',
      providerUserId: providerUserId,
      userId: userId,
      accessToken,
      refreshToken
    });
  }

  findAll() {
    return `This action returns all authAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authAccount`;
  }

  async upsertOAuthAccount(data: {
    userId: string;
    provider: string;
    providerUserId: string;
    accessToken?: string;
    refreshToken?: string;
  }) {
    return this.authAccountModel.findOneAndUpdate(
      {
        provider: data.provider,
        providerUserId: data.providerUserId,
      },
      {
        $setOnInsert: {
          userId: data.userId,
          provider: data.provider,
          providerUserId: data.providerUserId,
        },
        $set: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

  }

  update(id: number, updateAuthAccountDto: UpdateAuthAccountDto) {
    return `This action updates a #${id} authAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} authAccount`;
  }
}
