package br.com.furb.routes;

import br.com.furb.domain.SocialProject;
import br.com.furb.service.SocialProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

@RestController
@RequestMapping(value = "/social-project")
public class SocialProjectRoute {

	@Autowired
	private SocialProjectService socialProjectService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody SocialProject socialProject) {
		SocialProject socialProjectSaved = socialProjectService.save(socialProject);
		socialProjectSaved.setInstitution(null);
		return ResponseEntity.ok(socialProjectSaved);
	}

	@PutMapping(path="/{id}", produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody SocialProject socialProject) {
		return ResponseEntity.ok(socialProjectService.save(socialProject));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		//TODO
		return findSocialProjectsByVolunteerId(1L);
//		return ResponseEntity.ok(socialProjectService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(socialProjectService.findById(id));
	}

	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		socialProjectService.deleteById(id);
		return ResponseEntity.ok(String.format("Projeto social de id %d removido com sucesso!", id));
	}

	@GetMapping("/by-volunteer")
	public ResponseEntity<?> findSocialProjectsByVolunteerId(@RequestParam("volunteerId") Long volunteerId) {
		return ResponseEntity.ok(socialProjectService.findSocialProjectsByVolunteerId(volunteerId));
	}
}
