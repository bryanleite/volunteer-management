package br.com.furb.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "TB_ACTIVITY")
@AllArgsConstructor
@NoArgsConstructor
public class SocialProjectActivity extends IdentityCommonObject{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ATY_SPTID", nullable = false)
	private SocialProject socialProject;

	@Column(name = "ATY_INI")
	private LocalDateTime initialDateTime;

	@Column(name = "ATY_FIN")
	private LocalDateTime finalDateTime;

	@Column(name = "ATY_PARENT_ATYID")
	private SocialProjectActivity projectActivityParent;

	@Column(name = "ATY_GROUPER")
	private boolean grouper;
}
