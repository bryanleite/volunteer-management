package br.com.furb.repository;

import br.com.furb.domain.SocialProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialProjectRepository extends JpaRepository<SocialProject, Long> {
}
