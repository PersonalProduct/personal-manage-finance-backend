import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '@/modules/users/schemas/user.schema'

export type WalletDocument = Wallet & Document

@Schema({ timestamps: true })
export class Wallet {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    initBalance: number

    @Prop({
        required: true,
        enum: ['bank', 'cash', 'save', 'other'],
    })
    type: 'bank' | 'cash' | 'save' | 'other'

    @Prop({ default: true })
    active: boolean
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
