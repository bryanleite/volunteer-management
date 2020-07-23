package br.com.furb.service;

import br.com.furb.domain.Volunteer;
import br.com.furb.domain.dto.SocialProjectVolunteerDTO;
import br.com.furb.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerService extends AbstractService<Volunteer> {

	@Autowired
	private VolunteerRepository volunteerRepository;

	public List<SocialProjectVolunteerDTO> getVolunteersToInvite(Long skillId, String formalName, Long socialProjectId) {

		return mapToSocialProjectVolunteerDTO(volunteerRepository.getVolunteersToInvite(skillId, formalName, socialProjectId));
	}

	public List<SocialProjectVolunteerDTO> getVolunteersByInstitutionId(Long institutionId) {
		return mapToSocialProjectVolunteerDTO(volunteerRepository.getVolunteersByInstitutionId(institutionId));
	}

	public List<SocialProjectVolunteerDTO> getVolunteersByName(String formalName) {
		return mapToSocialProjectVolunteerDTO(volunteerRepository.getVolunteersByName(formalName));
	}

	private List<SocialProjectVolunteerDTO> mapToSocialProjectVolunteerDTO(List<Volunteer> volunteers) {
		List<SocialProjectVolunteerDTO> socialProjectVolunteers = new ArrayList<>();
		if(!CollectionUtils.isEmpty(volunteers)) {
			socialProjectVolunteers = volunteers.stream().map(v ->
				new SocialProjectVolunteerDTO(v.getId(),
					v.getFormalName(),
					v.getOccupation(),
					null,
					null,
					v.getDescription(),
					v.getUser().getId()))
				.collect(Collectors.toList());
		}

		return socialProjectVolunteers;
	}

	@Override
	protected JpaRepository<Volunteer, Long> getRepository() {
		return volunteerRepository;
	}
}
