import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createCollaborateurDto {

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    birth_day: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    embauche_date: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    photo_identity: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    timezone: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    deleted_at: Date;

    @IsOptional()
    @IsBoolean()
    is_admin: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    tentative: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    role: string;

    @IsOptional()
    @IsBoolean()
    is_businessOwner: boolean
}