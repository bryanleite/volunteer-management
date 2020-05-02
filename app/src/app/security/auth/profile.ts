import { Authority } from "./authority";

export class Profile {
    id: string;
    name: string;
    authorities: Authority[];
    active: boolean;
}