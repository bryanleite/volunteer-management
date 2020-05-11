package br.com.furb.routes;

import br.com.furb.domain.Volunteer;
import br.com.furb.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

@RestController
@RequestMapping(value = "/volunteer")
public class VolunteerRoute {

	@Autowired
	private VolunteerService volunteerService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Volunteer volunteer) {
		return ResponseEntity.ok(volunteerService.save(volunteer));
	}

	@PutMapping(path="/{id}", produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Volunteer volunteer) {
		return ResponseEntity.ok(volunteerService.save(volunteer));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(volunteerService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(volunteerService.findById(id));
	}

	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		volunteerService.deleteById(id);
		return ResponseEntity.ok(String.format("Voluntário de id %d removido com sucesso!", id));
	}

}
