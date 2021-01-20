package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.Role;
import fr.startintech.essentiel.data.model.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Role repository.
 * Extends CrudRepository to have basic CRUD operations.
 */
@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}