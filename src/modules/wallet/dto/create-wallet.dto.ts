import { IsEnum, IsMongoId, IsNotEmpty, IsPositive } from "class-validator";

export enum WalletType {
    bank = 'bank',
    cash = 'cash',
    save = 'save',
    other = 'other'
}

export class CreateWalletDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsPositive()
    initBalance: number;

    @IsEnum(WalletType)
    type: 'bank' | 'cash' | 'save' | 'other';
}
