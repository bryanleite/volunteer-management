package br.com.furb.security.authentication;

import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
public class GrantedAuthorirtyImpl implements GrantedAuthority {

	@Setter
	private String authority;

	@Override
	public String getAuthority() {
		return authority;
	}
}
