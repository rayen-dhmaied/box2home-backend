import { IsOptional, IsNotEmpty, IsNumber, IsString, IsDateString, IsBoolean } from 'class-validator';

export class createCanalVenteDto {

    @IsNotEmpty()
    @IsString()
    code : string;

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsOptional()
    @IsBoolean()
    is_children : boolean;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    deleted_at  : Date;

    @IsNotEmpty()
    @IsString()
    business_unit : string;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    business_owner : number;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    rules_id : number;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    macro_canal : number;

    @IsOptional()
    @IsBoolean()
    is_warning : boolean;

    @IsNotEmpty()
    @IsNumber()
    billing_accounts_id : number;
}