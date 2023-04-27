import {IsString , IsOptional, IsBoolean, IsNotEmpty,IsNumber, IsDateString} from 'class-validator';
	
export class UpdateCourseDto {
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	adresse_depart: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	adresse_arrivee: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	chauffeur_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	lettre_voiture_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	contact_arrivee_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	status_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	commande_id: number;
	
  @IsOptional()
	@IsNotEmpty()
	@IsString()
	code: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	point_enlevement: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	motif_annulation: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	motif_annulation_client: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	vehicule_type: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	observation: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	factures: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	nombre_colis: number;
	
	@IsOptional()
	@IsBoolean()
	manutention: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	estimated_km: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	duree_course: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_enlevement: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_livraison: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_demarrage: Date;
	
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
	@IsNumber()
	montantHT: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	token: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	nom_societe: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	adresse_facturation: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	course_source: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	observation_arrivee: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_acceptation:Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	deleted_at: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	vehicule_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	contact_depart_id: number;
	
	@IsOptional()
	@IsBoolean()
	manutention_double: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_affirmation_fin: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	note_interne: string;
	
	@IsOptional()
	@IsBoolean()
	non_envoi_mail: boolean;
	
	@IsOptional()
	@IsBoolean()
	is_status_changed_manually: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	assigned_at: Date;
	
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	montant_prestataire_ht: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	weight: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	compta_valid: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	external_tracking_url: string;
	
	@IsOptional()
	@IsBoolean()
	is_prepared: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	purchase_amount: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	tarification_details_id: number;
	
	@IsOptional()
	@IsBoolean()
	elevator: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	floor: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	coursemetadata_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	reception_status: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	delivery_status: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	customer_delivery_status: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	volume: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_dechargement: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_debut_chargement: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_fin_chargement: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_vers_livraison: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	service_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	dropoff_start: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	pickup_start: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	pickup_end: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	dropoff_end: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	canceled_at: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	estimated_time_of_arrival_at_pick_up: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	estimated_time_of_arrival_at_drop_off: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	pick_up_rank: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	drop_off_rank: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	tour: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	scheduled_at: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	tracking_number: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	driver_comment: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	failure_reason: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	canal_prestation_service: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	administratif_justif: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	administratif_status: string;
	
	@IsOptional()
	@IsBoolean()
	sms_approche: boolean;
	
	@IsOptional()
	@IsBoolean()
	sms_satisfaction: boolean;
	
	@IsOptional()
	@IsBoolean()
	virtual_signaure: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	administratif_status_id: number;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_retrait_impossible: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_livraison_impossible: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	receipt_number: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	dateSupplyComplete: Date;
	
	@IsOptional()
	@IsBoolean()
	has_conversation: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	secret_code: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsDateString()
	date_creation_mp: Date;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	facture_url: string;
	
	@IsOptional()
	@IsBoolean()
	bulky: boolean;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	etiquette_url: string;
	
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	delivery_related: string;
}