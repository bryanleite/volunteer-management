package br.com.furb.repository;

import br.com.furb.domain.Profile;
import br.com.furb.domain.ProfileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>{

	@Query("select p.profileType " +
			"from Profile p " +
			" join p.userProfiles up" +
			" join up.user u" +
			" where u.login = :login")
	List<ProfileType> getProfileTypesByLogin(@Param("login") String login);

}
