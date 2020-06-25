package br.com.furb.repository;

import br.com.furb.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface NotificationRepository extends JpaRepository<Notification, Long> {

	@Query("select n from Notification n where n.user.id = :userId ")
	List<Notification> getNotificationsByUserId(@Param("userId") Long userId);

	@Modifying
	@Query("update Notification n set n.read = true where n.id = :id")
	void updateNotificationToRead(@Param("id") Long id);

}
