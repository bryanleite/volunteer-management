package br.com.furb.service;

import br.com.furb.domain.SocialProjectVolunteer;
import br.com.furb.domain.SocialProjectVolunteerType;
import br.com.furb.domain.dto.SocialProjectVolunteerDTO;
import br.com.furb.repository.SocialProjectVolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SocialProjectVolunteerService extends AbstractService<SocialProjectVolunteer> {

	@Autowired
	private SocialProjectVolunteerRepository socialProjectVolunteerRepository;

	public Optional<SocialProjectVolunteerType> getSocialProjectVolunteerType(Long userId, Long socialProjectId) {
		return socialProjectVolunteerRepository.getSocialProjectVolunteerType(userId, socialProjectId);
	}

	public List<SocialProjectVolunteerDTO> getSocialProjectVolunteers(Long socialProjectId) {
		List<SocialProjectVolunteerDTO> volunteers = new ArrayList<>();
		List<SocialProjectVolunteer> socialProjectVolunteers = socialProjectVolunteerRepository.getSocialProjectVolunteers(socialProjectId);

		if(!CollectionUtils.isEmpty(socialProjectVolunteers)) {
			volunteers = socialProjectVolunteers.stream().map(spv ->
					new SocialProjectVolunteerDTO(spv.getVolunteer().getId(),
						spv.getVolunteer().getFormalName(),
						spv.getVolunteer().getOccupation(),
						spv.getSocialProjectVolunteerType(),
						spv.getId(),
						null,
						spv.getVolunteer().getUser().getId()))
				.collect(Collectors.toList());
		}

		return volunteers;
	}

	@Override
	protected JpaRepository<SocialProjectVolunteer, Long> getRepository() {
		return socialProjectVolunteerRepository;
	}
}
