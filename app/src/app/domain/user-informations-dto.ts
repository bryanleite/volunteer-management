import { User } from "../security/auth/user";
import { Volunteer } from "./volunteer";
import { Institution } from "./institution";
import { SocialProjectDTO } from "./social-project-dto";

export class UserInformationsDTO {
    user: User;
    volunteer: Volunteer;
    institution: Institution;
    socialProjects: SocialProjectDTO[];
}