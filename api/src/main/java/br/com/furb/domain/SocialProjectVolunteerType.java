package br.com.furb.domain;

import lombok.Getter;

public enum SocialProjectVolunteerType {

	MANAGER("Gestor de projeto voluntário", "Você foi adicionado como gestor no projeto social %s, parabéns!"),
	VOLUNTEER("Voluntário em projeto social", "Você foi adicionado como voluntário no projeto social %s, parabéns!"),
	CANDIDATE("Candidatura em projeto social", "Você foi adicionado como candidato no projeto social %s. Os gestores estão analisando seu perfil."),
	INVITED("Convite para projeto social", "Você foi convidado para participar como voluntário no projeto social %s. Clique neste link para mais detalhes!"),
	NO_VOLUNTEER("Sem mensagem", "Sem mensagem");

	SocialProjectVolunteerType(String notificationTitle, String notificationMessage) {
		this.notificationTitle = notificationTitle;
		this.notificationMessage = notificationMessage;
	}

	public boolean isActive() {
		return this.equals(MANAGER) || this.equals(VOLUNTEER);
	}

	@Getter
	private String notificationTitle;
	@Getter
	private String notificationMessage;
}
