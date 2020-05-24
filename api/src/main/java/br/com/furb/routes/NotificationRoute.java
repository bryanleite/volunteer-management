package br.com.furb.routes;

import br.com.furb.domain.Notification;
import br.com.furb.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

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

}
