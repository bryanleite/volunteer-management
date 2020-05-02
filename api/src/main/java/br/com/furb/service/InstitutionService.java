package br.com.furb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.com.furb.domain.Institution;
import br.com.furb.repository.InstitutionRepository;

@Service
public class InstitutionService extends AbstractService<Institution>{

	@Autowired
	private InstitutionRepository institutionRepository;
	
	@Override
	protected JpaRepository<Institution, Long> getRepository() {
		return institutionRepository;
	}

}
