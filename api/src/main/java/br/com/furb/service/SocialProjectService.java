package br.com.furb.service;

import br.com.furb.domain.SocialProject;
import br.com.furb.domain.SocialProjectVolunteer;
import br.com.furb.domain.SocialProjectVolunteerType;
import br.com.furb.domain.dto.SocialProjectDTO;
import br.com.furb.repository.SocialProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SocialProjectService extends AbstractService<SocialProject> {

	@Autowired
	private SocialProjectRepository socialProjectRepository;

	public List<SocialProjectDTO> findSocialProjectsByVolunteerId(Long volunteerId) {
		return mapToSocialProjectDTO(socialProjectRepository.findSocialProjectsByVolunteerId(volunteerId), volunteerId);
	}

	public List<SocialProjectDTO> findSocialProjectByFilters(String state, String city, Long institutionId, Long currentVolunteerId) {
		return mapToSocialProjectDTO(socialProjectRepository.findSocialProjectByFilters(state, city, institutionId), currentVolunteerId);
	}

	private List<SocialProjectDTO> mapToSocialProjectDTO(List<SocialProject> socialProjects, Long volunteerId) {
		List<SocialProjectDTO> socialProjectDTOS = new ArrayList<>();

		if(!CollectionUtils.isEmpty(socialProjects)) {
			socialProjectDTOS = socialProjects.stream().map(sp ->
				new SocialProjectDTO(sp.getId(),
					sp.getName(),
					sp.getDescription(),
					sp.getInitialDate(),
					sp.getFinalDate(),
					sp.getState(),
					sp.getCity(),
					sp.getInstitution().getName(),
					sp.getInstitution().getCity(),
					getSocialProjectVolunteerType(sp.getSocialProjectVolunteers(), volunteerId))
			).collect(Collectors.toList());
		}

		Collections.sort(socialProjectDTOS);
		return socialProjectDTOS;
	}

	private SocialProjectVolunteerType getSocialProjectVolunteerType(Set<SocialProjectVolunteer> socialProjectVolunteers, Long currentVolunteerId) {
		SocialProjectVolunteerType socialProjectVolunteerType = null;
		if(currentVolunteerId != null) {
			socialProjectVolunteerType = socialProjectVolunteers.stream().filter(spv ->
				currentVolunteerId.equals(spv.getVolunteer().getId()))
				.findFirst()
				.map(SocialProjectVolunteer::getSocialProjectVolunteerType).orElse(null);
		}

		return socialProjectVolunteerType;
	}

	@Override
	protected JpaRepository<SocialProject, Long> getRepository() {
		return socialProjectRepository;
	}
}
