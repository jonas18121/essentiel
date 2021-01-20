package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.Structure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Structure repository.
 * Extends CrudRepository to have basic CRUD operations.
 */
@Repository
public interface StructureRepository extends CrudRepository<Structure, Long> {
    Structure findByName(String name);
    List<Structure> findAll();
    List<Structure> findAllByAddress(String address);
    List<Structure> findAllByType(String type);
}
