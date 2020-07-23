package br.com.furb.service;

import br.com.furb.domain.Institution;
import br.com.furb.domain.User;
import br.com.furb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService extends AbstractService<User>{

	@Autowired
	private UserRepository userRepository;

	public void makeUserToManager(Long userId, Long institutionId) {
		Institution institution = new Institution(institutionId);
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			user.get().setInstitution(institution);
			userRepository.save(user.get());
		}
	}

	public void removerUserInstitution(Long userId) {
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			user.get().setInstitution(null);
			userRepository.save(user.get());
		}
	}
	
	@Override
	protected JpaRepository<User, Long> getRepository() {
		return userRepository;
	}

}
