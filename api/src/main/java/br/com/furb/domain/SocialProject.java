package br.com.furb.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
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

	@JsonSerialize(using = ToStringSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddThh:mm:ss.")
	@Column(name = "SPT_INIDATE")
	private LocalDate initialDate;

	@JsonSerialize(using = ToStringSerializer.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@Column(name = "SPT_FINDATE")
	private LocalDate finalDate;

	//Dados do endereço principal do projeto
	@Column(name = "SPT_STATE")
	private String state;

	@Column(name = "SPT_CITY")
	private String city;

	@Column(name = "SPT_CEP")
	private String cep;

	@Column(name = "SPT_STREET")
	private String street;

	@Column(name = "SPT_NUMBER")
	private String number;

	@JsonIgnore
	@OneToMany(mappedBy = "socialProject", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<SocialProjectVolunteer> socialProjectVolunteers;

}