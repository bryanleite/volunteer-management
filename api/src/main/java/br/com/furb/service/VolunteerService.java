package br.com.furb.service;

import br.com.furb.domain.Volunteer;
import br.com.furb.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class VolunteerService extends AbstractService<Volunteer> {

	@Autowired
	private VolunteerRepository volunteerRepository;

	@Override
	protected JpaRepository<Volunteer, Long> getRepository() {
		return volunteerRepository;
	}
}
