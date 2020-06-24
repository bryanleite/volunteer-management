package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "TB_SOCIAL_PROJECT")
@AllArgsConstructor
@NoArgsConstructor
public class SocialProject extends IdentityCommonObject {

	public SocialProject(Long id) {
		this.setId(id);
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "SPT_INTID", nullable = false)
	private Institution institution;

	@Column(name = "SPT_NAME", nullable = false)
	private String name;

	@Column(name = "SPT_DESCRIPTION", length = 4000)
	private String description;

	@Column(name = "SPT_INIDATE")
	private LocalDate initialDate;

	@Column(name = "SPT_FINDATE")
	private LocalDate finalDate;

	@JsonIgnore
	@OneToMany(mappedBy = "socialProject", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<SocialProjectVolunteer> socialProjectVolunteers;

}