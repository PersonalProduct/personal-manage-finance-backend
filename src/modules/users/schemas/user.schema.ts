import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    username?: string

    @Prop()
    avatarUrl?: string

    @Prop({ default: false })
    verified: boolean

    @Prop({
        type: {
            firstName: { type: String },
            midName: { type: String },
            lastName: { type: String },
            birthdate: { type: Date },
        },
        _id: false,
    })
    profile?: {
        firstName?: string
        midName?: string
        lastName?: string
        birthdate?: Date
    }
}

export const UserSchema = SchemaFactory.createForClass(User)
