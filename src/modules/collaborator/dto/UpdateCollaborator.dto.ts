import { IsString , IsEmail, IsOptional, IsBoolean, IsNotEmpty, MinLength} from "class-validator";

export class UpdateCollaboratorDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string

    @IsNotEmpty()
    @IsOptional()
    @MinLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    role: string

    @IsOptional()
    @IsBoolean()
    admin: boolean

}