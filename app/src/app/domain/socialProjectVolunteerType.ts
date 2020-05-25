export enum SocialProjectVolunteerType {
    MANAGER = "MANAGER",
	VOLUNTEER = "VOLUNTEER",
	CANDIDATE = "CANDIDATE",
	INVITED = "INVITED",
	NO_VOLUNTEER = "NO_VOLUNTEER"
}

export namespace SocialProjectVolunteerType {

	export function getSocialProjectVolunteerTypeName(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		switch (socialProjectVolunteerType) {
			case SocialProjectVolunteerType.MANAGER:
				return "Gerente do projeto";
			case SocialProjectVolunteerType.VOLUNTEER:
				return "Voluntário";
			case SocialProjectVolunteerType.CANDIDATE:
				return "Candidato";
			case SocialProjectVolunteerType.INVITED:
				return "Convidado";
			case SocialProjectVolunteerType.NO_VOLUNTEER:
				return "Não voluntário";		
			default:
				return "";
		}
	}

	export function getSocialProjectVolunteerTypeColor(socialProjectVolunteerType: SocialProjectVolunteerType): string {
		switch (socialProjectVolunteerType) {
			case SocialProjectVolunteerType.MANAGER:
				return "purple";
			case SocialProjectVolunteerType.VOLUNTEER:
				return "cyan";
			case SocialProjectVolunteerType.CANDIDATE:
				return "green";
			case SocialProjectVolunteerType.INVITED:
				return "orange";
			case SocialProjectVolunteerType.NO_VOLUNTEER:
				return "red";		
			default:
				return "red";
		}
	}
}