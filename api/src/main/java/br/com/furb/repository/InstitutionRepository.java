package br.com.furb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.furb.domain.Institution;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long>{
}
