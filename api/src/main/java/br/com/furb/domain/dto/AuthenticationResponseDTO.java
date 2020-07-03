package br.com.furb.domain.dto;

import br.com.furb.domain.Institution;
import br.com.furb.domain.Volunteer;
import br.com.furb.security.authentication.GrantedAuthorirtyImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponseDTO {

	private Long id;
	private String username;
	private Long timestamp;
	private Integer status;
	private String message;
	private String path;
	private String token;
	private List<GrantedAuthorirtyImpl> authorities;
	private Institution institution;
	private Volunteer volunteer;
	private Boolean admin;

}
