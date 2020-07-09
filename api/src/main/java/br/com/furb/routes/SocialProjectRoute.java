package br.com.furb.routes;

import br.com.furb.domain.SocialProject;
import br.com.furb.security.authentication.UserSV;
import br.com.furb.service.SocialProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;
import java.security.Principal;

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
		return ResponseEntity.ok(socialProjectService.findAll());
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

	@GetMapping("/my")
	public ResponseEntity<?> findSocialProjectsByVolunteerId(Principal principal) {
		UserSV user = (UserSV) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

		if(user != null && user.getVolunteer() != null && user.getVolunteer().getId() != null) {
			return ResponseEntity.ok(socialProjectService.findSocialProjectsByVolunteerId(user.getVolunteer().getId()));
		}
		return ResponseEntity.ok(null);
	}

	@GetMapping("/by-filters")
	public ResponseEntity<?> findSocialProjectByFilters(Principal principal,
														@RequestParam(value = "state", required = false) String state,
														@RequestParam(value = "city", required = false) String city,
														@RequestParam(value = "institutionId", required = false) Long institutionId) {

		UserSV user = (UserSV) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
		Long volunteerId = user != null && user.getVolunteer() != null ? user.getVolunteer().getId() : null ;
		return ResponseEntity.ok(socialProjectService.findSocialProjectByFilters(state, city, institutionId, volunteerId));
	}
}