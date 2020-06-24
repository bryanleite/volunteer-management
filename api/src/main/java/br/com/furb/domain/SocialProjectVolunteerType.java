package br.com.furb.domain;

public enum SocialProjectVolunteerType {

	MANAGER,
	VOLUNTEER,
	CANDIDATE,
	INVITED,
	NO_VOLUNTEER;

	public boolean isActive() {
		return this.equals(MANAGER) || this.equals(VOLUNTEER);
	}
}
