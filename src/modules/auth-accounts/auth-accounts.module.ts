import { Module } from '@nestjs/common';
import { AuthAccountsService } from './auth-accounts.service';
import { AuthAccountsController } from './auth-accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthAccount, AuthAccountSchema } from './schemas/auth-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthAccount.name, schema: AuthAccountSchema },
    ]),
  ],
  controllers: [AuthAccountsController],
  providers: [AuthAccountsService],
  exports: [AuthAccountsService],
})
export class AuthAccountsModule { }
