package br.com.furb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import br.com.furb.domain.Event;
import br.com.furb.repository.EventRepository;

@Service
public class EventService extends AbstractService<Event>{

	@Autowired
	private EventRepository eventRepository;
	
	@Override
	protected JpaRepository<Event, Long> getRepository() {
		return eventRepository;
	}

}
