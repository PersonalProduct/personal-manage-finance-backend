import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '@/modules/users/schemas/user.schema'

export type CategoryDocument = Category & Document

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Category {
    @Prop({ type: Types.ObjectId, ref: User.name })
    userId?: Types.ObjectId // null = system

    @Prop({ required: true })
    name: string

    @Prop({ required: true, enum: ['income', 'expense'] })
    type: 'income' | 'expense'

    @Prop({ required: true, enum: ['system', 'user'], default: 'system' })
    scope: 'system' | 'user'
}

export const CategorySchema = SchemaFactory.createForClass(Category)
