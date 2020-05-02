package br.com.furb.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "TB_INSTITUTION")
public class Institution extends IdentityCommonObject{
	private static final long serialVersionUID = 1L;

	@Column(name = "INT_NAME")
	private String name;
	
	@Column(name = "INT_DESCRI")
	private String descri;
	
	@Column(name = "INT_CEP")
	private String cep;
	
	@Column(name = "INT_NUMBER")
	private String number;
	
	@Column(name = "INT_STREET")
	private String street;
	
	@Column(name = "INT_COMPLEMENT")
	private String complement;
	
	@Column(name = "INT_CITY")
	private String city;
	
	@Column(name = "INT_STATE")
	private String state;
	
}
