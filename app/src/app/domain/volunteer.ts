import { User } from "../security/auth/user";

export class Volunteer {
    id: number;
    user: User;
    formalName: string;
    birthDate: Date;
    occupation: string;
    description: string;
}