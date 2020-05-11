package br.com.furb.domain.dto;

import br.com.furb.security.authentication.GrantedAuthorirtyImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponseDTO {

	private Long timestamp;
	private Integer status;
	private String message;
	private String path;
	private String token;
	private List<GrantedAuthorirtyImpl> authorities;

}
