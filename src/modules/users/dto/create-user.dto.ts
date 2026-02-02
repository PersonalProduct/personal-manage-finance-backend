import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    username?: string
    @IsOptional()
    avatarUrl?: string
    @IsOptional()
    firstName?: string
    @IsOptional()
    midName?: string
    @IsOptional()
    lastName?: string
    @IsOptional()
    @IsDateString()
    birthdate?: Date
}
