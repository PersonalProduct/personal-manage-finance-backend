import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto { 
    @IsMongoId()
    @IsNotEmpty()
    _id: string;
    @IsOptional()
    username?: string;
    @IsOptional()
    avatarUrl?: string;
    @IsOptional()
    firstName?: string
    @IsOptional()
    midName?: string;
    @IsOptional()
    lastName?: string;
    @IsOptional()
    @IsDateString()
    birthdate?: Date;
}
