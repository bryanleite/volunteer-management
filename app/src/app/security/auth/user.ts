import { Profile } from "./profile";

export class User {
    id: string;
    username: string;
    login: string;
    name: string;
    password: string;
    email: string;
    profiles: Profile[];
    currentProfile: Profile;
    active: boolean;
}