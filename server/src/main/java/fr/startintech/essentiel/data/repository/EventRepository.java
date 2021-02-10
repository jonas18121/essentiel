package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.Event;
import fr.startintech.essentiel.data.model.Structure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Event repository.
 * Extends CrudRepository to have basic CRUD operations.
 */
@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    Event findByName(String name);
    List<Event> findAll();
    List<Event> findAllByCity(String city);
    List<Event> findAllByOrganizer(Structure organizer);
}
