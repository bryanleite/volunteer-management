package br.com.furb.repository;

import br.com.furb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query(" from User where login = :login ")
	Optional<User> loadUserByLogin(@Param("login") String username);

}
