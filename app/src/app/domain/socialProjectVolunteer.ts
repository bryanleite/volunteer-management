import { SocialProject } from "./social-project";
import { Volunteer } from "./volunteer";
import { SocialProjectVolunteerType } from "./socialProjectVolunteerType";

export class SocialProjectVolunteer {
    socialProject: SocialProject;
    volunteer: Volunteer;
    socialProjectVolunteerType: SocialProjectVolunteerType;
}