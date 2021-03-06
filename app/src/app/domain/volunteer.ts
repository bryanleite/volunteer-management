import { User } from "../security/auth/user";
import { VolunteerSkill } from "./volunteer-skill";
import { SocialProjectVolunteerType } from "./socialProjectVolunteerType";

export class Volunteer {
    id: number;
    user: User;
    formalName: string;
    birthDate: Date;
    occupation: string;
    description: string;
    state: string;
    city: string;
    cep: string;

    volunteerSkills: Array<VolunteerSkill>;    
    userId: number;

    // Dados para uso dentro do projeto corrente
    socialProjectVolunteerType: SocialProjectVolunteerType;
    socialProjectVolunteerId: number;
}