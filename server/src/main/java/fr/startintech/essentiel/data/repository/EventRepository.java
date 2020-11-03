package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.Event;
import fr.startintech.essentiel.data.model.Structure;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Event repository.
 * Extends CrudRepository to have basic CRUD operations.
 */
public interface EventRepository extends CrudRepository<Event, Long> {
    Event findByName(String name);
    List<Event> findAll();
    List<Event> findAllByAddress(String address);
    List<Event> findAllByOrganizer(Structure organizer);
}
