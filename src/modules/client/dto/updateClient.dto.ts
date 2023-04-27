import { IsOptional, IsNotEmpty, IsNumber, IsString, IsBoolean, IsDateString } from 'class-validator';


export class updateClientDto {

  @IsOptional()
  @IsBoolean()
  enregistre: boolean;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  adresse_facturation: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  mail: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  reputation: string;

  @IsOptional()
  @IsBoolean()
  accept_condition: boolean;

  @IsOptional()
  @IsBoolean()
  accept_mail_notification: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stripe_customer_id: string;

  @IsOptional()
  @IsBoolean()
  checked: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image_avatar_url: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  timezone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  confirmation_token : string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  reset_token: string;

  @IsOptional()
  @IsBoolean()
  mail_checked: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  updated_at: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  deleted_at: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fcm_token: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  societe_id: number;

  @IsOptional()
  @IsBoolean()
  vip: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  autoconnect_key : string;

  @IsOptional()
  @IsBoolean()
  is_admin: boolean;

  @IsOptional()
  @IsBoolean()
  is_primary: boolean;

  @IsOptional()
  @IsBoolean()
  initiate_chat: boolean;

  @IsOptional()
  @IsBoolean()
  email_checked: boolean;
 
}