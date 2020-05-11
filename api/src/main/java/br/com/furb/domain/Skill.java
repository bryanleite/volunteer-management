package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TB_SKILL")
public class Skill extends IdentityCommonObject{

	@Column(name = "SKL_NAME")
	private String skillName;

	@JsonIgnore
	@OneToMany(mappedBy = "skill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<VolunteerSkill> volunterSkills;

}
