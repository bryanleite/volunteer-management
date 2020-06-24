package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "TB_USER")
@AllArgsConstructor
@NoArgsConstructor
public class User extends IdentityCommonObject{
	private static final long serialVersionUID = 1L;

    @Column(name = "USU_NAME")
    private String username;

    @Column(name = "USU_LOGIN", unique = true)
    private String login;

    @Column(name = "USU_PASSWORD")
    private String password;

    @Column(name = "USU_EMAIL", unique = true)
    private String email;

    @JsonIgnore
    @JoinColumn(name = "USU_INTID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Institution institution;

    @Column(name = "USU_ISADM")
    private boolean admin;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UserProfile> userProfiles;

    @JsonBackReference
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Volunteer volunteer;
}