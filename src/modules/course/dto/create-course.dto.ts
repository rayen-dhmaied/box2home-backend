import {IsString , IsEmail, IsOptional, IsBoolean, IsNotEmpty, MinLength,IsNumber, IsDate  } from 'class-validator';

export class CreateCourseDto {
    
    @IsOptional()
    @IsNumber()
    adresse_depart: number;

    @IsOptional()
    @IsNumber()
    adresse_arrivee: number;

    @IsOptional()
    @IsNumber()
    chauffeur_id: number;

    @IsOptional()
    @IsNumber()
    lettre_voiture_id: number;
    
    @IsOptional()
    @IsNumber()
    contact_arrivee_id: number;

    @IsOptional()
    @IsNumber()
    status_id: number;

    @IsOptional()
    @IsNumber()
    commande_id: number;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    point_enlevement: string;

    @IsOptional()
    @IsString()
    motif_annulation: string;

    @IsOptional()
    @IsString()
    motif_annulation_client: string;

    @IsOptional()
    @IsString()
    vehicule_type: string;

    @IsOptional()
    @IsString()
    observation: string;

    @IsOptional()
    @IsString()
    factures: string;

    @IsOptional()
    @IsNumber()
    nombre_colis: number;

    @IsOptional()
    @IsBoolean()
    manutention: boolean;

    @IsOptional()
    @IsNumber()
    estimated_km: number;

    @IsOptional()
    @IsString()
    duree_course: string;

    @IsOptional()
    @IsDate()
    date_enlevement: Date;

    @IsOptional()
    @IsDate()
    date_livraison: Date;

    @IsOptional()
    @IsDate()
    date_demarrage: Date;

    @IsOptional()
    @IsDate()
    created_at: Date;

    @IsOptional()
    @IsDate()
    updated_at: Date;

    @IsOptional()
    @IsNumber()
    montantHT: number;

    @IsOptional()
    @IsString()
    token: string;

    @IsOptional()
    @IsString()
    nom_societe: string;

    @IsOptional()
    @IsString()
    adresse_facturation: string;

    @IsOptional()
    @IsString()
    course_source: string;

    @IsOptional()
    @IsString()
    observation_arrivee: string;

    @IsOptional()
    @IsDate()
    date_acceptation:Date;

    @IsOptional()
    @IsDate()
    deleted_at: Date;

    @IsOptional()
    @IsNumber()
    vehicule_id: number;

    @IsOptional()
    @IsNumber()
    contact_depart_id: number;

    @IsOptional()
    @IsBoolean()
    manutention_double: boolean;

    @IsOptional()
    @IsDate()
    date_affirmation_fin: Date;

    @IsOptional()
    @IsString()
    note_interne: string;

    @IsOptional()
    @IsBoolean()
    non_envoi_mail: boolean;

    @IsBoolean()
    is_status_changed_manually: boolean;

    @IsOptional()
    @IsDate()
    assigned_at: Date;


    @IsOptional()
    @IsNumber()
    montant_prestataire_ht: number;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    compta_valid: number;

    @IsOptional()
    @IsString()
    external_tracking_url: string;
    
    @IsOptional()
    @IsBoolean()
    is_prepared: boolean;

    @IsOptional()
    @IsNumber()
    purchase_amount: number;

    @IsOptional()
    @IsNumber()
    tarification_details_id: number;

    @IsOptional()
    @IsBoolean()
    elevator: boolean;

    @IsOptional()
    @IsNumber()
    floor: number;

    @IsOptional()
    @IsNumber()
    coursemetadata_id: number;

    @IsOptional()
    @IsNumber()
    reception_status: number;

    @IsOptional()
    @IsNumber()
    delivery_status: number;

    @IsOptional()
    @IsNumber()
    customer_delivery_status: number;

    @IsOptional()
    @IsNumber()
    volume: number;

    @IsOptional()
    @IsDate()
    date_dechargement: Date;

    @IsOptional()
    @IsDate()
    date_debut_chargement: Date;

    @IsOptional()
    @IsDate()
    date_fin_chargement: Date;

    @IsOptional()
    @IsDate()
    date_vers_livraison: Date;

    @IsOptional()
    @IsNumber()
    service_id: number;

    @IsOptional()
    @IsDate()
    dropoff_start: Date;

    @IsOptional()
    @IsDate()
    pickup_start: Date;

    @IsOptional()
    @IsDate()
    pickup_end: Date;

    @IsOptional()
    @IsDate()
    dropoff_end: Date;

    @IsOptional()
    @IsDate()
    canceled_at: Date;

    @IsOptional()
    @IsDate()
    estimated_time_of_arrival_at_pick_up: Date;

    @IsOptional()
    @IsDate()
    estimated_time_of_arrival_at_drop_off: Date;

    @IsOptional()
    @IsNumber()
    pick_up_rank: number;

    @IsOptional()
    @IsNumber()
    drop_off_rank: number;

    @IsOptional()
    @IsString()
    tour: string;

    @IsOptional()
    @IsDate()
    scheduled_at: Date;

    @IsOptional()
    @IsString()
    tracking_number: string;

    @IsOptional()
    @IsString()
    driver_comment: string;

    @IsOptional()
    @IsString()
    failure_reason: string;

    @IsOptional()
    @IsNumber()
    canal_prestation_service: number;

    @IsOptional()
    @IsString()
    administratif_justif: string;


    @IsOptional()
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
    @IsNumber()
    administratif_status_id: number;


    @IsOptional()
    @IsDate()
    date_retrait_impossible: Date;


    @IsOptional()
    @IsDate()
    date_livraison_impossible: Date;


    @IsOptional()
    @IsString()
    receipt_number: string;


    @IsOptional()
    @IsDate()
    dateSupplyComplete: Date;


    @IsOptional()
    @IsBoolean()
    has_conversation: boolean;


    @IsOptional()
    @IsString()
    secret_code: string;


    @IsOptional()
    @IsDate()
    date_creation_mp: Date;


    @IsOptional()
    @IsString()
    facture_url: string;


    @IsOptional()
    @IsBoolean()
    bulky: boolean;


    @IsOptional()
    @IsString()
    etiquette_url: string;


    @IsOptional()
    @IsString()
    delivery_related: string;
}


