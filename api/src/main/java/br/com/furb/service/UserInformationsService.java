package br.com.furb.service;

import br.com.furb.domain.User;
import br.com.furb.domain.Volunteer;
import br.com.furb.domain.dto.SocialProjectDTO;
import br.com.furb.domain.dto.UserDTO;
import br.com.furb.domain.dto.UserInformationsDTO;
import br.com.furb.repository.UserRepository;
import br.com.furb.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserInformationsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private VolunteerRepository volunteerRepository;

	@Autowired
	private SocialProjectService socialProjectService;

	public UserInformationsDTO getUserInformations(Long userId) {
		UserInformationsDTO userInformations = new UserInformationsDTO();

		Optional<User> user = userRepository.getUserWithInstitution(userId);
		if(user.isPresent()) {
			userInformations.setInstitution(user.get().getInstitution());
			userInformations.setUser(new UserDTO(user.get().getId(), user.get().getLogin(), user.get().getEmail()));
			Optional<Volunteer> volunteer = volunteerRepository.getVolunteerByUserId(userId);
			if(volunteer.isPresent()) {
				volunteer.get().setUser(null);
				userInformations.setVolunteer(volunteer.get());

				List<SocialProjectDTO> socialProjects = socialProjectService.findSocialProjectsByVolunteerId(volunteer.get().getId());
				userInformations.setSocialProjects(socialProjects.stream().filter(sp ->
					sp.getSocialProjectVolunteerType().isActive())
					.collect(Collectors.toList()));
			}
		}

		return userInformations;
	}

}
