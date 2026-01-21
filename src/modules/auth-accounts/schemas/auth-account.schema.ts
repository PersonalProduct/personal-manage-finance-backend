import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '@/modules/users/schemas/user.schema'

export type AuthAccountDocument = AuthAccount & Document

@Schema({ collection: 'auth-account', timestamps: { createdAt: true, updatedAt: false } })
export class AuthAccount {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId

    @Prop({ required: true })
    provider: string

    @Prop({ required: true })
    providerUserId: string

    @Prop()
    accessToken?: string

    @Prop()
    refreshToken?: string
}

export const AuthAccountSchema =
    SchemaFactory.createForClass(AuthAccount)

// unique account
AuthAccountSchema.index(
    { provider: 1, providerUserId: 1 },
    { unique: true },
)
