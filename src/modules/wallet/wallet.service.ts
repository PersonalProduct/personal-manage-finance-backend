import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Model, Types } from 'mongoose';
import { Wallet } from '@/modules/wallet/schemas/wallet.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>
  ) { }

  async create(createWalletDto: CreateWalletDto) {
    const { userId, name, type, initBalance } = { ...createWalletDto };
    if (initBalance < 0) {
      throw new BadRequestException('Invalid init balance value.');
    }

    return await this.walletModel.create({
      userId: new Types.ObjectId(userId),
      name,
      type,
      initBalance
    });
  }

  async findAllOfUser(id: string, current: number, pageSize: number) {
    if (!id) throw new BadRequestException('Invalid data request.');
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    const skip = (current - 1) * pageSize;

    const filter = { userId: new Types.ObjectId(id) };

    return await this.walletModel.find(filter).skip(skip).limit(pageSize).sort({ createAt: -1 });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    return await this.walletModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    return await this.walletModel.findOneAndUpdate({
      _id: new Types.ObjectId(id)
    }, {
      name: updateWalletDto.name,
      type: updateWalletDto.type
    }, {
      new: false
    });
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    return await this.walletModel.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }
}
