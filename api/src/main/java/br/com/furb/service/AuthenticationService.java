package br.com.furb.service;

import br.com.furb.domain.Institution;
import br.com.furb.domain.ProfileType;
import br.com.furb.domain.User;
import br.com.furb.domain.Volunteer;
import br.com.furb.repository.InstitutionRepository;
import br.com.furb.repository.ProfileRepository;
import br.com.furb.repository.UserRepository;
import br.com.furb.repository.VolunteerRepository;
import br.com.furb.security.authentication.GrantedAuthorirtyImpl;
import br.com.furb.security.authentication.UserSV;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private InstitutionRepository institutionRepository;

	@Autowired
	private VolunteerRepository volunteerRepository;
	
	/**
	 * Busca o usuário através do username para autenticação do Spring Security
	 * @param username
	 * @return
	 */
	public UserSV loadUserByUsername(String username) {
		UserSV userSv = null;
		try {
			Optional<User> user = userRepository.loadUserByLogin(username);
			if(user.isPresent()) {
				userSv = new UserSV(user.get().getLogin(), user.get().getPassword(), user.get().getAdmin());

				List<ProfileType> profileTypes = profileRepository.getProfileTypesByLogin(username);
				if(profileTypes != null && !CollectionUtils.isEmpty(profileTypes)) {
					userSv.setGrantedAuthorirties(profileTypes.stream()
						.map(pt -> pt != null ? new GrantedAuthorirtyImpl(pt.toString()) : null)
						.collect(Collectors.toList()));
				}

				userSv.setUserId(user.get().getId());
				Optional<Institution> institution = institutionRepository.getInstitutionByUserId(user.get().getId());
				userSv.setInstitution(institution.orElse(null));
				Optional<Volunteer> volunteer = volunteerRepository.getVolunteerByUserId(user.get().getId());
				if(volunteer.isPresent()) {
					volunteer.get().setUser(null);
					volunteer.get().setVolunteerSkills(null);
					volunteer.get().setSocialProjectVolunteers(null);
					userSv.setVolunteer(volunteer.get());
				}
			}
		} catch (Exception e) {
			throw new RuntimeException("Ocorreram falhas ao realizar a autenticação. Causa: " + e.getMessage());
		}
		
		return userSv;
	}

}
