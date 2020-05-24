package br.com.furb.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "TB_NOTIFICATION")
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends IdentityCommonObject{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NOT_USUID", nullable = false)
	private User user;

	@Column(name = "NOT_DESCRIPTION", nullable = false)
	private String description;

}
