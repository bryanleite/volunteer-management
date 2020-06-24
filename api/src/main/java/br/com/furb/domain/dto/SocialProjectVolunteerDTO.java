package br.com.furb.domain.dto;

import br.com.furb.domain.SocialProjectVolunteerType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SocialProjectVolunteerDTO {
	private Long id; //Id de voluntario
	private String formalName;
	private String occupation;
	private SocialProjectVolunteerType socialProjectVolunteerType;
	private Long socialProjectVolunteerId;
	private String description;
	private Long userId;
}
