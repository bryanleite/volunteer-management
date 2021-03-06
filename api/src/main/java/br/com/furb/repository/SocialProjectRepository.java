package br.com.furb.repository;

import br.com.furb.domain.SocialProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialProjectRepository extends JpaRepository<SocialProject, Long> {

	@Query("select sp from SocialProject sp" +
			" inner join sp.socialProjectVolunteers spv" +
			" where spv.volunteer.id = :volunteerId ")
	List<SocialProject> findSocialProjectsByVolunteerId(@Param("volunteerId") Long volunteerId);

	@Query("select sp from SocialProject sp " +
		   " inner join sp.socialProjectVolunteers spv " +
		   " where (:state is null or sp.state = :state) and " +
		   "      (:city is null or sp.city = :city) and " +
		   "      (:institutionId is null or sp.institution.id = :institutionId) " +
		   " group by sp ")
	List<SocialProject> findSocialProjectByFilters(@Param("state") String state, @Param("city") String city, @Param("institutionId") Long institutionId);
}
