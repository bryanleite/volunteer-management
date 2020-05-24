package br.com.furb.service;

import br.com.furb.domain.SocialProject;
import br.com.furb.repository.SocialProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class SocialProjectService extends AbstractService<SocialProject> {

	@Autowired
	private SocialProjectRepository socialProjectRepository;


	@Override
	protected JpaRepository<SocialProject, Long> getRepository() {
		return socialProjectRepository;
	}
}
