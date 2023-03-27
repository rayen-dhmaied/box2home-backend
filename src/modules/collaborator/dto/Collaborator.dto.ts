import { IsString , IsEmail, IsOptional, IsBoolean, IsNotEmpty, MinLength} from "class-validator";

export class CollaboratorDto {

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    role: string

    @IsOptional()
    @IsBoolean()
    admin: boolean

}