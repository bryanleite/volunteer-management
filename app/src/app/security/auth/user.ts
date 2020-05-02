import { Profile } from "./profile";

export class User {
    id: string;
    username: string;
    name: string;
    password: string;
    email: string;
    profiles: Profile[];
    currentProfile: Profile;
    active: boolean;
}