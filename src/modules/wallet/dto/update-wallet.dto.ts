import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

``
export class UpdateWalletDto {
    @IsMongoId()
    @IsNotEmpty()
    _id: string;

    @IsOptional()
    name?:string;
    
    @IsOptional()
    type?: 'bank' | 'cash' | 'save' | 'other';
 }
