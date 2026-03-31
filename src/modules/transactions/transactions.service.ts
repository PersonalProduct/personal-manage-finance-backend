import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '@/modules/transactions/schemas/transaction.schema';
import { Model } from 'mongoose';
import { WalletService } from '@/modules/wallet/wallet.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private walletService: WalletService
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const session = await this.transactionModel.db.startSession();

    try {
      session.startTransaction();
      const transaction = await this.transactionModel.create([createTransactionDto], { session });
      await this.walletService.updateBalance(
        createTransactionDto.walletId,
        createTransactionDto.type,
        createTransactionDto.amount,
        session);

      await session.commitTransaction();
      return transaction;

    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
