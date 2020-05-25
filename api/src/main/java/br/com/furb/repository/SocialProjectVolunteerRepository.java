package br.com.furb.repository;

import br.com.furb.domain.SocialProjectVolunteer;
import br.com.furb.domain.SocialProjectVolunteerType;
import br.com.furb.domain.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialProjectVolunteerRepository extends JpaRepository<SocialProjectVolunteer, Long> {

	@Query("select spv.socialProjectVolunteerType " +
			" from SocialProjectVolunteer spv " +
			" inner join spv.volunteer vol " +
			" inner join spv.socialProject sp " +
			" where vol.user.id = :userId and " +
			"       sp.id = :socialProjectId ")
	Optional<SocialProjectVolunteerType> getSocialProjectVolunteerType(@Param("userId") Long userId, @Param("socialProjectId") Long socialProjectId);

	@Query("select spv from SocialProjectVolunteer spv" +
			" where spv.socialProject.id = :socialProjectId ")
	List<SocialProjectVolunteer> getSocialProjectVolunteers(@Param("socialProjectId") Long socialProjectId);

}
