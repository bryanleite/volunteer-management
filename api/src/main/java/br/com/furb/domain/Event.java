package br.com.furb.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "TB_EVENT")
public class Event extends IdentityCommonObject {
	private static final long serialVersionUID = -7729689783319683775L;

	@Enumerated(EnumType.STRING)
	@Column(name = "EVE_TYPE")
	private EventType eventType;
	
	@Column(name = "EVE_NAME")
	private String name;
	
	@Column(name = "EVE_DESC")
	private String description;
	
	@Column(name = "EVE_LOCAL")
	private String local;
	
	@Column(name = "EVE_INITDATE")
	private Date initDate;
	
	@Column(name = "EVE_ENDDATE")
	private Date endDate;

	@Column(name = "EVE_TOTPARTICIP")
	private Integer totalParticipants;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EVE_INTID", nullable = false)
	private Institution institution;
}
