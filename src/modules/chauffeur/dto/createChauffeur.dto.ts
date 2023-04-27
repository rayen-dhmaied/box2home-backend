import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createChauffeurDto {
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    premium_id : number;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    latitude : number;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    longitude : number;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    etat : number;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    heading : number;
    
    @IsNotEmpty()
    @IsString()
    lastname : string;
    
    @IsNotEmpty()
    @IsString()
    firstname : string;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    birth_day : string;
        
    @IsNotEmpty()
    @IsString()
    login : string;
        
    @IsNotEmpty()
    @IsString()
    password : string;
        
    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    created_at : Date;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    validated_at : Date;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    validation_end_at : Date;

    @IsOptional()
    @IsBoolean()
    valide : boolean;

    @IsOptional()
    @IsBoolean() 
    manutention : boolean;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    phone : string;

    @IsNotEmpty()
    @IsString()
    code : string;

    @IsNotEmpty()
    @IsString()
    company_name : string;

    @IsNotEmpty()
    @IsString()
    company_siret : string;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    image_avatar_url : string;
    
    @IsOptional()
    @IsBoolean()
    checked : boolean;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    timezone : string;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    deleted_at : Date;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    fcm_token : string;
	
	@IsOptional()
	@IsNotEmpty()
    @IsNumber()
    on_duty : number;

    @IsOptional()
	@IsNotEmpty()
    @IsString()
    device_info : string;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    last_login_at : Date;

    @IsOptional()
	@IsNotEmpty()
    @IsDateString()
    last_logout_at : Date;

    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    societe_id : number;

    @IsNotEmpty()
    @IsString()
    role : string;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    external_id : number;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    adresse_depart : number;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    adresse_arrivee : number;
    
    @IsOptional()
	@IsNotEmpty()
    @IsNumber()
    current_vehicule : number;
}