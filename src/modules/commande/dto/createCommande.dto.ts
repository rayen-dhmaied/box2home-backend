import {IsString , IsOptional, IsBoolean, IsNotEmpty,IsNumber, IsDateString  } from 'class-validator';

export class CreateCommandeDto {
    @IsOptional()
	@IsNotEmpty()
	@IsNumber()
  canal_vente_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  facture_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  devis_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  client_id : number;

  @IsNotEmpty()
  @IsNumber()
  montant_global_ht : number;

  @IsNotEmpty()
  @IsNumber()
  code_tva : number;

  @IsNotEmpty()
  @IsNumber()
  montant_global_ttc : number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  date_facturation : Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  promotion_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  deleted_at : Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  etat_paiement : string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stripe_source_id : string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  created_at : Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  updated_at : Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  collaborateur_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stripe_invoice_id : string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  moyen_paiement_id : number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stripe_invoice_payment_link : string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  partner_order_number : string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  melting_point_order_number : string;
}