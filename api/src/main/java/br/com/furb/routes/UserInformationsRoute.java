package br.com.furb.routes;

import br.com.furb.service.UserInformationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user-informations")
public class UserInformationsRoute {

	@Autowired
	private UserInformationsService userInformationsService;

	@GetMapping(path="/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(userInformationsService.getUserInformations(id));
	}

}
