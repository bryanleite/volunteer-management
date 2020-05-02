package br.com.furb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.furb.domain.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
}
