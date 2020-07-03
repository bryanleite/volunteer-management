package br.com.furb.security.authentication;

import br.com.furb.domain.Institution;
import br.com.furb.domain.Volunteer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserSV implements UserDetails{
	
private static final long serialVersionUID = 1L;
	
	private String username;
	private String password;

	@Getter
	@Setter
	private Long userId;

	@Getter
	@Setter
	private Institution institution;

	@Getter
	@Setter
	private Volunteer volunteer;

	@Getter
	@Setter
	private Boolean admin;

	@Setter
	private List<GrantedAuthorirtyImpl> grantedAuthorirties;
	
	public UserSV() {
	}
	
	public UserSV(String username, String password, Boolean admin) {
		super();
		this.username = username;
		this.password = password;
		this.admin = admin;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return grantedAuthorirties;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
