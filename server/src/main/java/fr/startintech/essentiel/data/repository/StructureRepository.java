package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.Structure;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StructureRepository extends CrudRepository<Structure, Long> {
    Structure findByName(String name);
    List<Structure> findAll();
    List<Structure> findAllByAddress(String address);
    List<Structure> findAllByType(String type);
}
