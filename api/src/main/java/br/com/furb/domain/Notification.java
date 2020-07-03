package br.com.furb.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

	@Column(name = "NOT_TITLE")
	private String title;

	@Column(name = "NOT_PAGELINK")
	private String pageLink;

	@Column(name = "NOT_QUERYPARAM")
	private String queryParamId;

	@Column(name = "NOT_DESCRIPTION")
	private String description;

	@JsonSerialize(using = ToStringSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@Column(name = "NOT_DATETIME", nullable = false)
	private LocalDateTime dateTime;

	@Column(name = "NOT_READ")
	private Boolean read;

}
