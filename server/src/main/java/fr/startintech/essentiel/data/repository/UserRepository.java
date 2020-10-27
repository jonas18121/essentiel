package fr.startintech.essentiel.data.repository;

import fr.startintech.essentiel.data.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAll();
    List<User> findAllByRole(String role);
}
