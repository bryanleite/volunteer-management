package br.com.furb.repository;

import br.com.furb.domain.VolunteerSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerSkillsRepository extends JpaRepository<VolunteerSkill, Long> {
}
