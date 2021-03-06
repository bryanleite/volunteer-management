package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "TB_VOLUNTEER")
@AllArgsConstructor
@NoArgsConstructor
public class Volunteer extends IdentityCommonObject {

	public Volunteer(Long id) {
		this.setId(id);
	}

	@JsonManagedReference
	@JoinColumn(name = "VOL_USUID", nullable = false)
	@OneToOne(fetch = FetchType.EAGER)
	private User user;

	@Column(name = "VOL_NAME")
	private String formalName;

	@Column(name = "VOL_BIRTHDATE")
	private LocalDate birthDate;

	@Column(name = "VOL_OCCUPATION")
	private String occupation;

	@Column(name = "VOL_DESCRIPTION")
	private String description;

	@Column(name = "VOL_STATE")
	private String state;

	@Column(name = "VOL_CITY")
	private String city;

	@Column(name = "VOL_CEP")
	private String cep;

	@Lob
	@Column(name = "VOL_PHOTO")
	private byte[] photo;

	@JsonManagedReference
	@OneToMany(mappedBy = "volunteer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<VolunteerSkill> volunteerSkills;

	@JsonIgnore
	@OneToMany(mappedBy = "volunteer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<SocialProjectVolunteer> socialProjectVolunteers;
}
