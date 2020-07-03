package br.com.furb.service;

import br.com.furb.domain.*;
import br.com.furb.domain.dto.SocialProjectVolunteerDTO;
import br.com.furb.repository.SocialProjectRepository;
import br.com.furb.repository.SocialProjectVolunteerRepository;
import br.com.furb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SocialProjectVolunteerService extends AbstractService<SocialProjectVolunteer> {

	@Autowired
	private SocialProjectVolunteerRepository socialProjectVolunteerRepository;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SocialProjectRepository socialProjectRepository;

	private static final String PAGE_LINK = "pages/social-projects";

	public Optional<SocialProjectVolunteerType> getSocialProjectVolunteerType(Long userId, Long socialProjectId) {
		return socialProjectVolunteerRepository.getSocialProjectVolunteerType(userId, socialProjectId);
	}

	public List<SocialProjectVolunteerDTO> getSocialProjectVolunteers(Long socialProjectId) {
		List<SocialProjectVolunteerDTO> volunteers = new ArrayList<>();
		List<SocialProjectVolunteer> socialProjectVolunteers = socialProjectVolunteerRepository.getSocialProjectVolunteers(socialProjectId);

		if(!CollectionUtils.isEmpty(socialProjectVolunteers)) {
			volunteers = socialProjectVolunteers.stream().map(spv ->
					new SocialProjectVolunteerDTO(spv.getVolunteer().getId(),
						spv.getVolunteer().getFormalName(),
						spv.getVolunteer().getOccupation(),
						spv.getSocialProjectVolunteerType(),
						spv.getId(),
						null,
						spv.getVolunteer().getUser().getId()))
				.collect(Collectors.toList());
		}

		return volunteers;
	}

	@Override
	public SocialProjectVolunteer save(SocialProjectVolunteer entity) {
		boolean isInsert = Objects.isNull(entity.getId());
		SocialProjectVolunteer socialProjectVolunteer = super.save(entity);

		if(isInsert)
			handleNotifications(socialProjectVolunteer);

		return socialProjectVolunteer;
	}

	private void handleNotifications(SocialProjectVolunteer socialProjectVolunteer) {
		Notification notification = new Notification();
		Optional<SocialProject> socialProject = socialProjectRepository.findById(socialProjectVolunteer.getSocialProject().getId());

		notification.setUser(new User(userRepository.getUserIdByVolunteerId(socialProjectVolunteer.getVolunteer().getId()).get()));
		notification.setTitle(socialProjectVolunteer.getSocialProjectVolunteerType().getNotificationTitle());
		notification.setDescription(String.format(socialProjectVolunteer.getSocialProjectVolunteerType().getNotificationMessage(), socialProject.get().getName()));
		notification.setPageLink(PAGE_LINK);
		notification.setQueryParamId(socialProjectVolunteer.getSocialProject().getId().toString());
		notification.setDateTime(LocalDateTime.now());
		notification.setRead(false);

		notificationService.save(notification);
	}

	@Override
	protected JpaRepository<SocialProjectVolunteer, Long> getRepository() {
		return socialProjectVolunteerRepository;
	}
}
