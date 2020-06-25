package br.com.furb.service;

import br.com.furb.domain.Notification;
import br.com.furb.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService extends AbstractService<Notification>{

	@Autowired
	private NotificationRepository notificationRepository;

	public List<Notification> getNotificationsByUserId(Long userId) {
		return notificationRepository.getNotificationsByUserId(userId);
	}

	public void updateNotificationToRead(Long id) {
		notificationRepository.updateNotificationToRead(id);
	}

	@Override
	protected JpaRepository<Notification, Long> getRepository() {
		return notificationRepository;
	}
}
