package br.com.furb.service;

import br.com.furb.domain.Skill;
import br.com.furb.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class SkillService extends AbstractService<Skill> {

	@Autowired
	private SkillRepository skillRepository;

	@Override
	protected JpaRepository<Skill, Long> getRepository() {
		return skillRepository;
	}
}
