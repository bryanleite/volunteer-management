package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "TB_PROFILE")
public class Profile extends IdentityCommonObject{
	private static final long serialVersionUID = 1L;

	@Column(name = "PRO_NAME", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "PRO_TYPE")
    private ProfileType profileType;

    @Column(name = "PRO_ACTIVE")
    private boolean active;

	@JsonIgnore
	@OneToMany(mappedBy = "profile", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<UserProfile> userProfiles;
}
