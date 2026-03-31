import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      initBalance,
      currentBalance: initBalance,
    });
  }

  async findAllOfUser(id: string, current: number, pageSize: number) {
    if (!id) throw new BadRequestException('Invalid data request.');
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    const skip = (current - 1) * pageSize;

    const filter = { userId: new Types.ObjectId(id), active: true };

    const result = await this.walletModel
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createAt: -1 });
    return {
      meta: {
        current,
        pageSize,
        total: await this.walletModel.countDocuments(filter)
      },
      data: result,
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    const wallet = await this.walletModel.findOne({ _id: new Types.ObjectId(id), active: true });
    if (!wallet) {
      throw new NotFoundException('Wallet not found.');
    }
    return wallet;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    let wallet = await this.walletModel.findOne({ _id: new Types.ObjectId(id), active: true });
    if (!wallet) {
      throw new NotFoundException('Wallet not found.');
    }
    const { name, type } = { ...updateWalletDto };
    wallet.name = name || wallet.name;
    wallet.type = type || wallet.type;
    return await wallet.save();
  }

  async updateBalance(id: string, transactionType: string, newBalance: number, session: any) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    if (newBalance < 0) {
      throw new BadRequestException('Invalid balance value.');
    }

    const updated = await this.walletModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), active: true },
      {
        $inc: {
          currentBalance: transactionType === 'income' ? newBalance : -newBalance,
        },
      },
      { new: true, session }
    );
    if (!updated) {
      throw new NotFoundException('Wallet not found.');
    }
    return updated;
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid data request.');
    }
    return await this.walletModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { active: false },
      { new: true }
    );
  }
}
