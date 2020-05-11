package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TB_VOL_SKILL")
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerSkill extends IdentityCommonObject{

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VSL_VOLID", nullable = false)
	private Volunteer volunteer;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "VSL_SKLID", nullable = false)
	private Skill skill;

}
