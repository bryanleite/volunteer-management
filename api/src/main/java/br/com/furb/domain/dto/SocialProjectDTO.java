package br.com.furb.domain.dto;

import br.com.furb.domain.SocialProjectVolunteerType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocialProjectDTO {

	private Long id;
	private String name;
	private String description;
	private LocalDate initialDate;
	private LocalDate finalDate;
	private String state;
	private String city;
	private String institutionName;
	private String institutionCity;
	private SocialProjectVolunteerType socialProjectVolunteerType;

}