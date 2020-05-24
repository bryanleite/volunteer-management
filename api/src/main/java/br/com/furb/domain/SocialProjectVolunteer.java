package br.com.furb.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TB_SPT_VOL")
@AllArgsConstructor
@NoArgsConstructor
public class SocialProjectVolunteer extends IdentityCommonObject{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SVL_SPTID", nullable = false)
	private SocialProject socialProject;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SVL_VOLID", nullable = false)
	private Volunteer volunteer;

	@Enumerated(EnumType.STRING)
	@Column(name = "SVL_TYPE", nullable = false)
	private SocialProjectVolunteerType socialProjectVolunteerType;

}
