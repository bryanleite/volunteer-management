package br.com.furb.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TB_ATY_VOL")
@AllArgsConstructor
@NoArgsConstructor
public class ActivityVolunteer extends IdentityCommonObject{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AVL_VOLID", nullable = false)
	private Volunteer volunteer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AVL_ATYID", nullable = false)
	private SocialProjectActivity socialProjectActivity;

}
