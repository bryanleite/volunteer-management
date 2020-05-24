package br.com.furb.repository;

import br.com.furb.domain.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

	@Query("select vol from Volunteer vol where vol.user.id = :userId")
	Optional<Volunteer> getVolunteerByUserId(@Param("userId") Long userId);

}
