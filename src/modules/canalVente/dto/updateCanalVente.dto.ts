import { IsOptional, IsNotEmpty, IsNumber, IsString, IsDateString, IsBoolean } from 'class-validator';


export class updateCanalVenteDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    code : string;

    @IsOptional()
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

    @IsOptional()
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

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    billing_accounts_id : number;
}