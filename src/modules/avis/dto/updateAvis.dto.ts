import { IsOptional, IsNotEmpty, IsNumber, IsString, IsDateString, Max, Min } from 'class-validator';


export class UpdateAvisDto {
 
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  chauffeur_id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  client_id: number;
  
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  nombre_etoile: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  commentaire: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  deleted_at: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id_review_product_avis_verifie: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  commentaire_commande: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id_review_site_avis_verifie : string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  nombre_etoile_commande: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  nps: number;
 
}