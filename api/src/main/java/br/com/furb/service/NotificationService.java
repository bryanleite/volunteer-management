package br.com.furb.service;

import br.com.furb.domain.Notification;
import br.com.furb.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService extends AbstractService<Notification>{

	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	protected JpaRepository<Notification, Long> getRepository() {
		return notificationRepository;
	}
}
