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

import br.com.furb.domain.Event;
import br.com.furb.service.EventService;

@RestController
@RequestMapping(value="/events")
public class EventRoute {
	
	@Autowired
	private EventService eventService;
	
	@PostMapping(produces = MediaType.APPLICATION_JSON)
	public ResponseEntity<?> save(@RequestBody Event event) {
		return ResponseEntity.ok(eventService.save(event));
	}
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(eventService.findAll());
	}
	
	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(eventService.findById(id));
	}
	
	@PostMapping(path="/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
		eventService.deleteById(id);
		return ResponseEntity.ok(String.format("Evento de id %d removido com sucesso!", id));
	}


}
