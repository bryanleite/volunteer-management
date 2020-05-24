package br.com.furb.repository;

import br.com.furb.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long>{

	@Query("select i from Institution i" +
			" inner join i.users users" +
			" where users.id = :userId")
	Optional<Institution> getInstitutionByUserId(@Param("userId") Long userId);

}
