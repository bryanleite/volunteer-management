package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TB_SOCIAL_PROJECT")
@AllArgsConstructor
@NoArgsConstructor
public class SocialProject extends IdentityCommonObject {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "SPT_INTID", nullable = false)
	private Institution institution;

	@Column(name = "SPT_NAME", nullable = false)
	private String name;

	@Column(name = "SPT_DESCRIPTION")
	private String description;

}