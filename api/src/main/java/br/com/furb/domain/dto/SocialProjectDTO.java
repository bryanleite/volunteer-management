package br.com.furb.domain.dto;

import br.com.furb.domain.SocialProjectVolunteerType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocialProjectDTO implements Comparable<SocialProjectDTO>{

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

	/**
	 * Utilizado para ordenação da lista. Retorna primeiro sempre o projeto com a data de início mais próxima à data atual.
	 * @param o
	 * @return
	 */
	@Override
	public int compareTo(SocialProjectDTO o) {
		LocalDate now = LocalDate.now();
		return (int) (getPositiveValue(ChronoUnit.DAYS.between(now, getInitialDate())) - getPositiveValue(ChronoUnit.DAYS.between(now, o.getInitialDate())));
	}

	private Long getPositiveValue(Long value) {
		if(value < 0) {
			value = value * -1;
		}

		return value;
	}
}