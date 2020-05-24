package br.com.furb.routes;

import br.com.furb.domain.SocialProjectVolunteer;
import br.com.furb.domain.SocialProjectVolunteerType;
import br.com.furb.service.SocialProjectVolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;
import java.util.Optional;

@RestController
@RequestMapping(value = "/social-project-volunteer")
public class SocialProjectVolunteerRoute {

	@Autowired
	private SocialProjectVolunteerService socialProjectVolunteerService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody SocialProjectVolunteer socialProjectVolunteer) {
		return ResponseEntity.ok(socialProjectVolunteerService.save(socialProjectVolunteer));
	}

	@PutMapping(path="/{id}", produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody SocialProjectVolunteer socialProjectVolunteer) {
		return ResponseEntity.ok(socialProjectVolunteerService.save(socialProjectVolunteer));
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(socialProjectVolunteerService.findAll());
	}

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(socialProjectVolunteerService.findById(id));
	}

	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		socialProjectVolunteerService.deleteById(id);
		return ResponseEntity.ok(String.format("Voluntário do projeto social de id %d removido com sucesso!", id));
	}

	@GetMapping("/volunteer-type")
	public ResponseEntity<?> getSocialProjectVolunteerType(@RequestParam("userId") Long userId, @RequestParam("socialProjectId") Long socialProjectId) {
		Optional<SocialProjectVolunteerType> socialProjectVolunteerType = socialProjectVolunteerService.getSocialProjectVolunteerType(userId, socialProjectId);
		return ResponseEntity.ok(socialProjectVolunteerType.orElse(SocialProjectVolunteerType.NO_VOLUNTEER));
	}

}
