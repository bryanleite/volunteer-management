package br.com.furb.routes;

import br.com.furb.domain.User;
import br.com.furb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

@RestController
@RequestMapping(value="/users")
public class UserRoute {

	@Autowired
	private UserService userService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody User user) {
		return ResponseEntity.ok(userService.save(user));
	}

	@PutMapping(path="/:id")
	public ResponseEntity<?> update(@RequestParam("id") Long id, @RequestBody User user) {
		return ResponseEntity.ok(userService.save(user));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(userService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(userService.findById(id));
	}

	@PostMapping(path="/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		userService.deleteById(id);
		return ResponseEntity.ok(String.format("\"Usuário de id %d removido com sucesso!\"", id));
	}

	@PostMapping("/make-user-to-manager")
	public ResponseEntity<?> makeUserToManager(@RequestParam("userId") Long userId,
	                                           @RequestParam("institutionId") Long institutionId) {
		userService.makeUserToManager(userId, institutionId);
		return ResponseEntity.ok(String.format("\"Usuário de id %d adicionado a instituição com sucesso!\"", userId));
	}

	@PostMapping("/remove-user-institution")
	public ResponseEntity<?> removerUserInstitution(@RequestParam("userId") Long userId) {
		userService.removerUserInstitution(userId);
		return ResponseEntity.ok(String.format("\"Instituição removida do Usuário de id %d com sucesso!\"", userId));
	}
}
