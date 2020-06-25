package br.com.furb.routes;

import br.com.furb.domain.Notification;
import br.com.furb.security.authentication.UserSV;
import br.com.furb.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/notification")
public class NotificationRoute {

	@Autowired
	private NotificationService notificationService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Notification notification) {
		return ResponseEntity.ok(notificationService.save(notification));
	}

	@PutMapping(path="/{id}", produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Notification notification) {
		return ResponseEntity.ok(notificationService.save(notification));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(notificationService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(notificationService.findById(id));
	}

	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		notificationService.deleteById(id);
		return ResponseEntity.ok(String.format("Notificação de id %d removido com sucesso!", id));
	}

	@GetMapping("/my-notifications")
	public ResponseEntity<?> getMyNotifications(Principal principal) {
		UserSV user = (UserSV) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
		return ResponseEntity.ok(removeUserInstance(notificationService.getNotificationsByUserId(user.getUserId())));
	}

	@PostMapping(path="/update-to-read/{id}")
	public void updateNotificationToRead(@PathVariable("id") Long id) {
		notificationService.updateNotificationToRead(id);
		ResponseEntity.ok();
	}

	private List<Notification> removeUserInstance(List<Notification> notifications) {
		if(!CollectionUtils.isEmpty(notifications)) {
			notifications.forEach(n -> n.setUser(null));
		}
		return notifications;
	}

}
