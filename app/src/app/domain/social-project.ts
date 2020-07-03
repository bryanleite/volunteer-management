import { Institution } from "./institution";

export class SocialProject {

    id: number;
    name: string;
    description: string;
    initialDate: Date;
    finalDate: Date;
    institution: Institution;
    state: string;
    city: string;
    cep: string;
    street: string;
    number: number;

}