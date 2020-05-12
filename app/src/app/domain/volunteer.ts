import { User } from "../security/auth/user";
import { VolunteerSkill } from "./volunteer-skill";

export class Volunteer {
    id: number;
    user: User;
    formalName: string;
    birthDate: Date;
    occupation: string;
    description: string;
    volunteerSkills: Array<VolunteerSkill>;    
}