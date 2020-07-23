package br.com.furb.repository;

import br.com.furb.domain.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

	@Query("select vol from Volunteer vol where vol.user.id = :userId")
	Optional<Volunteer> getVolunteerByUserId(@Param("userId") Long userId);

	@Query("select vol" +
			" from Volunteer vol" +
			" left join vol.volunteerSkills vs " +
			" where (:skillId is null or vs.skill.id = :skillId) and" +
			"       (:formalName is null or lower(vol.formalName) like lower(concat('%', :formalName, '%'))) and" +
			"       0 = (select count(vInt.id) " + //não possua relação com o projeto
			"            from Volunteer vInt " +
			"            inner join vInt.socialProjectVolunteers spvInt " +
			"            where vInt.id = vol.id and spvInt.socialProject.id = :socialProjectId) " +
			" group by vol ")
	List<Volunteer> getVolunteersToInvite(@Param("skillId") Long skillId, @Param("formalName") String formalName, @Param("socialProjectId") Long socialProjectId);

	@Query(" select vol from Volunteer vol " +
			" inner join vol.user usu " +
			" where usu.institution.id = :institutionId ")
	List<Volunteer> getVolunteersByInstitutionId(@Param("institutionId") Long institutionId);

	@Query("select vol" +
		" from Volunteer vol" +
		" inner join vol.user usu " +
		" where usu.institution is null and " +
		"       (:formalName is null or lower(vol.formalName) like lower(concat('%', :formalName, '%')))")
	List<Volunteer> getVolunteersByName(@Param("formalName") String formalName);

}