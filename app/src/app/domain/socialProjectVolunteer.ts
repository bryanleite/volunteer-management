import { SocialProject } from "./social-project";
import { Volunteer } from "./volunteer";
import { SocialProjectVolunteerType } from "./socialProjectVolunteerType";

export class SocialProjectVolunteer {
    id: number;
    socialProject: SocialProject;
    volunteer: Volunteer;
    socialProjectVolunteerType: SocialProjectVolunteerType;
}