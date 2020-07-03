import { Profile } from "./profile";
import { Institution } from "src/app/domain/institution";
import { Volunteer } from "src/app/domain/volunteer";

export class User {
    id: number;
    username: string;
    login: string;
    name: string;
    password: string;
    email: string;
    profiles: Profile[];
    currentProfile: Profile;
    active: boolean;
    institution: Institution;
    volunteer: Volunteer;
    admin: boolean;
}