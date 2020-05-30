package br.com.furb.service;

import br.com.furb.domain.SocialProject;
import br.com.furb.domain.dto.SocialProjectDTO;
import br.com.furb.repository.SocialProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialProjectService extends AbstractService<SocialProject> {

	@Autowired
	private SocialProjectRepository socialProjectRepository;

	public List<SocialProjectDTO> findSocialProjectsByVolunteerId(Long volunteerId) {
		List<SocialProjectDTO> socialProjectDTOS = new ArrayList<>();
		List<SocialProject> socialProjects = socialProjectRepository.findSocialProjectsByVolunteerId(volunteerId);

		if(!CollectionUtils.isEmpty(socialProjects)) {
			socialProjectDTOS = socialProjects.stream().map(sp ->
				new SocialProjectDTO(sp.getId(),
					sp.getName(),
					sp.getDescription(),
					sp.getInitialDate(),
					sp.getFinalDate(),
					sp.getInstitution().getName(),
					sp.getInstitution().getCity(),
					sp.getSocialProjectVolunteers().stream().filter(spv ->
						volunteerId.equals(spv.getVolunteer().getId()))
						.findFirst()
						.get()
						.getSocialProjectVolunteerType())
			).collect(Collectors.toList());
		}

		return socialProjectDTOS;
	}

	@Override
	protected JpaRepository<SocialProject, Long> getRepository() {
		return socialProjectRepository;
	}
}
