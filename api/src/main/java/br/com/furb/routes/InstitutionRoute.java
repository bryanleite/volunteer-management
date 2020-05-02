package br.com.furb.routes;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.furb.domain.Institution;
import br.com.furb.service.InstitutionService;

@RestController
@RequestMapping(value="/institutions")
public class InstitutionRoute {
	
	@Autowired
	private InstitutionService institutionService;
	
	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Institution institution) {
		return ResponseEntity.ok(institutionService.save(institution));
	}
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(institutionService.findAll());
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(institutionService.findById(id));
	}
	
	@PostMapping(path="/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		institutionService.deleteById(id);
		return ResponseEntity.ok(String.format("Instituição de id %d removido com sucesso!", id));
	}
}
