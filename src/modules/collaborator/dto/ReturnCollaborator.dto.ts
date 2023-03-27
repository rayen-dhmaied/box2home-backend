import { Expose } from 'class-transformer';

export class ReturnCollaboratorDto {
    @Expose()
    firstName: string
    
    @Expose()
    lastName: string

    @Expose()
    email: string

    @Expose()
    role: string

    @Expose()
    admin: boolean

    @Expose()
    createdAt : Date

    @Expose()
    updatedAt: Date
}