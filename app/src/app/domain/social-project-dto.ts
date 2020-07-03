import { SocialProjectVolunteerType } from "./socialProjectVolunteerType";

export class SocialProjectDTO {
    id: number;
	name: string;
	description: string;
	initialDate: Date;
	finalDate: Date;
	institutionName: string;
	institutionCity: string;
	state: string;
	city: string;
	socialProjectVolunteerType: SocialProjectVolunteerType;
}