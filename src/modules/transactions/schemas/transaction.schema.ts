import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Category } from '@/modules/categories/schemas/category.schema'
import { User } from '@/modules/users/schemas/user.schema'
import { Wallet } from '@/modules/wallet/schemas/wallet.schema'


export type TransactionDocument = Transaction & Document

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Transaction {
    // @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    // userId!: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Wallet.name, required: true })
    walletId!: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
    categoryId!: Types.ObjectId

    @Prop({ required: true, enum: ['income', 'expense'] })
    type!: 'income' | 'expense'

    @Prop({ required: true })
    amount!: number

    @Prop({ required: true })
    reason!: string

    @Prop({ required: true })
    date!: Date

    @Prop()
    media?: string
}

export const TransactionSchema =
    SchemaFactory.createForClass(Transaction)

// index cho report
// TransactionSchema.index({ userId: 1, date: -1 })
TransactionSchema.index({ walletId: 1, date: -1 })
