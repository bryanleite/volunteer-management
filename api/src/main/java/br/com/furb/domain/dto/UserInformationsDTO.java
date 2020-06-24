package br.com.furb.domain.dto;

import br.com.furb.domain.Institution;
import br.com.furb.domain.Volunteer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInformationsDTO {

	private UserDTO user;
	private Volunteer volunteer;
	private Institution institution;
	private List<SocialProjectDTO> socialProjects;

}
