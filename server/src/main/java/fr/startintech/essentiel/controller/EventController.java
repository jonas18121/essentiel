package fr.startintech.essentiel.controller;

import fr.startintech.essentiel.data.model.Event;
import fr.startintech.essentiel.data.repository.EventRepository;
import fr.startintech.essentiel.exeption.IdMismatchException;
import fr.startintech.essentiel.exeption.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="/api/event") // This means URL's start with /api (after Application path)
public class EventController {
    @Autowired  // This means to get the bean called EventRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private EventRepository repository;

    /**
     * Get all events
     * @return a list of Events
     */
    @GetMapping // Map ONLY GET Requests
    public List<Event> findAll() {
        // This returns a JSON or XML with the events
        return repository.findAll();
    }

    /**
     * Get event by name
     * @param eventName event's name
     * @return called event
     */
    @GetMapping("/name/{eventName}") // Map ONLY GET Requests
    public Event findByName(@PathVariable String eventName) {
        // @PathVariable means it is a parameter from path
        return repository.findByName(eventName);
    }

    /**
     * Get Event by id
     * @param id event's id
     * @return called event
     * @throws NotFoundException
     */
    @GetMapping("/{id}") // Map ONLY GET Requests
    public Event findOne(@PathVariable Long id) throws NotFoundException {
        return repository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    /**
     * Create a new event
     * @param event event to create
     * @return created event
     */
    @PostMapping // Map ONLY POST Requests
    @ResponseStatus(HttpStatus.CREATED)
    public Event create(@RequestBody Event event) {
        return repository.save(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws NotFoundException {
        repository.findById(id)
                .orElseThrow(NotFoundException::new);
        repository.deleteById(id);
    }

    /**
     * Delete all events
     */
    @DeleteMapping // Map ONLY DELETE Requests
    public void delete() {
        repository.deleteAll();
    }

    /**
     * Update sent event
     * @param event event to update
     * @param id Event id
     * @return saved event
     * @throws IdMismatchException
     * @throws NotFoundException
     */
    @PutMapping("/{id}") // Map ONLY PUT Requests
    public Event updateEvent(@RequestBody Event event, @PathVariable Long id) throws IdMismatchException, NotFoundException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        repository.findById(id).orElseThrow(NotFoundException::new);
        event.setId(id);
        return repository.save(event);
    }
}
