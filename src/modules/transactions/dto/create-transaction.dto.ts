import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsUrl, Length, MaxDate, Min } from "class-validator"

export enum TranType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsMongoId()
    walletId!: string

    @IsNotEmpty()
    @IsMongoId()
    categoryId!: string

    @IsNotEmpty()
    @IsEnum(TranType)
    type!: string 

    @IsNotEmpty()
    @Min(1000)
    amount!: number

    @IsNotEmpty()
    @Length(1, 200)
    reason!: string

    @IsNotEmpty()
    @MaxDate(new Date(Date.now()))
    date!: Date

    @IsUrl()
    @IsOptional()
    media?: string
}
