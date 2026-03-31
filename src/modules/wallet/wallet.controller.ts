import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UnauthorizedException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from '@/decorator/customize';

@Controller('wallets')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private jwtService: JwtService
  ) { }

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get('user/:id')
  async findAllOfUser(
    @Param('id') id: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string
  ) {
    return await this.walletService.findAllOfUser(id, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.walletService.findOne(id);
  }

  @Patch()
  async update(
    @Body('token') token: string,
    @Body() updateWalletDto: UpdateWalletDto) {
    if (!token) {
      throw new UnauthorizedException('Unauthorized.');
    }
    var decode = this.jwtService.verify(token);
    return await this.walletService.update(decode.sub, updateWalletDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.walletService.remove(id);
  }
}
