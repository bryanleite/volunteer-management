package br.com.furb.routes;

import br.com.furb.domain.Volunteer;
import br.com.furb.domain.VolunteerSkill;
import br.com.furb.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

@RestController
@RequestMapping(value = "/volunteer")
public class VolunteerRoute {

	@Autowired
	private VolunteerService volunteerService;

	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Volunteer volunteer) {
		if(volunteer != null && !CollectionUtils.isEmpty(volunteer.getVolunteerSkills())) {
			for(VolunteerSkill v: volunteer.getVolunteerSkills()) {
				v.setVolunteer(volunteer);
			}
		}
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

	@GetMapping("/volunteers-to-invite")
	public ResponseEntity<?> getVolunteersToInvite(@RequestParam(value = "formalName", required = false) String formalName,
	                                               @RequestParam(value = "skillId", required = false) Long skillId,
	                                               @RequestParam(value = "socialProjectId") Long socialProjectId) {
		return ResponseEntity.ok(volunteerService.getVolunteersToInvite(skillId, formalName, socialProjectId));
	}

	@GetMapping("/managers/{institutionId}")
	public ResponseEntity<?> getManagersByInstitutionId(@PathVariable("institutionId") Long institutionId) {
		return ResponseEntity.ok(volunteerService.getVolunteersByInstitutionId(institutionId));
	}

	@GetMapping("/volunteers-to-make-manager")
		public ResponseEntity<?> getManagersByInstitutionId(@RequestParam(value = "formalName", required = false) String formalName) {
		return ResponseEntity.ok(volunteerService.getVolunteersByName(formalName));
	}
}
