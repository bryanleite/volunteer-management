package br.com.furb.routes;

import br.com.furb.domain.Skill;
import br.com.furb.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

@RestController
@RequestMapping(value = "/skill")
public class SkillRoute {

	@Autowired
	private SkillService skillService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Skill skill) {
		return ResponseEntity.ok(skillService.save(skill));
	}

	@PutMapping(path="/:id")
	public ResponseEntity<?> update(@RequestParam("id") Long id, @RequestBody Skill skill) {
		return ResponseEntity.ok(skillService.save(skill));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(skillService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(skillService.findById(id));
	}

	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		skillService.deleteById(id);
		return ResponseEntity.ok(String.format("Habilidade de id %d removido com sucesso!", id));
	}

}
