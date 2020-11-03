package fr.startintech.essentiel.data.model;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * User entity.
 */
@Entity
@Table(name = "User")
public class User {
    /**
     * User identifier.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * User email which serve as login credential.
     */
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * User password.
     */
    @Column(name = "password", nullable = true)
    private String password;

    /**
     * User role.
     */
    @Column(name = "role", nullable = true)
    private String role;

    /**
     * User linked structures.
     */
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumns({
            @JoinColumn(name = "fk_user", referencedColumnName = "id")
    }) private Map<Integer, Structure> structures = new HashMap<Integer, Structure>();

    /**
     * User roles array.
     */
    private static final String[] roles = {"administrator", "moderator", "contributor"};

    /**
     * User constructor.
     */
    public User() { }

    /**
     * @return User id.
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id User id to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return User email.
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email User email to set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return User password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password User password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return User role.
     */
    public String getRole() {
        return role;
    }

    /**
     * @param role User role to set.
     * @throws Exception Throws an exception if the role does not match to any role in the roles array.
     */
    public void setRole(String role) throws Exception {
        switch (role) {
            case "admin", "administrator" -> this.role = roles[0];
            case "modo", "moderator" -> this.role = roles[1];
            case "user", "contributor" -> this.role = roles[2];
            default -> throw new Exception();
        }
    }

    /**
     * User type to set from the roles array.
     * @param roleId Position id in the roles array.
     * @throws Exception Throws an exception if id doesnt match.
     */
    public void setRole(int roleId) throws Exception {
        switch (roleId) {
            case 1 -> this.role = roles[0];
            case 2 -> this.role = roles[1];
            case 3 -> this.role = roles[2];
            default -> throw new Exception();
        }
    }

    /**
     * @return User linked structures.
     */
    public Map<Integer, Structure> getStructures() {
        return structures;
    }

    /**
     * @param structures User structures to set.
     */
    public void setStructures(Map<Integer, Structure> structures) {
        this.structures = structures;
    }
}
