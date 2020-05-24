package br.com.furb.service;

import br.com.furb.domain.SocialProjectVolunteer;
import br.com.furb.domain.SocialProjectVolunteerType;
import br.com.furb.repository.SocialProjectVolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SocialProjectVolunteerService extends AbstractService<SocialProjectVolunteer> {

	@Autowired
	private SocialProjectVolunteerRepository socialProjectVolunteerRepository;

	public Optional<SocialProjectVolunteerType> getSocialProjectVolunteerType(Long userId, Long socialProjectId) {
		return socialProjectVolunteerRepository.getSocialProjectVolunteerType(userId, socialProjectId);
	}

	@Override
	protected JpaRepository<SocialProjectVolunteer, Long> getRepository() {
		return socialProjectVolunteerRepository;
	}
}
