package fr.startintech.essentiel.controller;

import fr.startintech.essentiel.data.model.Structure;
import fr.startintech.essentiel.data.repository.StructureRepository;
import fr.startintech.essentiel.exeption.IdMismatchException;
import fr.startintech.essentiel.exeption.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="/api/structure") // This means URL's start with /api (after Application path)
public class StructureController {
    @Autowired  // This means to get the bean called StructureRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private StructureRepository repository;

    /**
     * Get all structures
     * @return a list of Structures
     */
    @GetMapping // Map ONLY GET Requests
    public List<Structure> findAll() {
        // This returns a JSON or XML with the structures
        return repository.findAll();
    }

    /**
     * Get structure by name
     * @param structureName structure's name
     * @return called structure
     */
    @GetMapping("/name/{structureName}") // Map ONLY GET Requests
    public Structure findByName(@PathVariable String structureName) {
        // @PathVariable means it is a parameter from path
        return repository.findByName(structureName);
    }

    /**
     * Get Structure by id
     * @param id structure's id
     * @return called structure
     * @throws NotFoundException
     */
    @GetMapping("/{id}") // Map ONLY GET Requests
    public Structure findOne(@PathVariable Long id) throws NotFoundException {
        return repository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    /**
     * Create a new structure
     * @param structure structure to create
     * @return created structure
     */
    @PostMapping // Map ONLY POST Requests
    @ResponseStatus(HttpStatus.CREATED)
    public Structure create(@RequestBody Structure structure) {
        return repository.save(structure);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws NotFoundException {
        repository.findById(id)
                .orElseThrow(NotFoundException::new);
        repository.deleteById(id);
    }

    /**
     * Delete all structures
     */
    @DeleteMapping // Map ONLY DELETE Requests
    public void delete() {
        repository.deleteAll();
    }

    /**
     * Update sent structure
     * @param structure structure to update
     * @param id Structure id
     * @return saved structure
     * @throws IdMismatchException
     * @throws NotFoundException
     */
    @PutMapping("/{id}") // Map ONLY PUT Requests
    public Structure updateStructure(@RequestBody Structure structure, @PathVariable Long id) throws IdMismatchException, NotFoundException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        if (structure.getId() != id) {
            throw new IdMismatchException();
        }
        repository.findById(id)
                .orElseThrow(NotFoundException::new);
        return repository.save(structure);
    }
}
