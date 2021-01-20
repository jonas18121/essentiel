package fr.startintech.essentiel.data.model;

import org.hibernate.annotations.NaturalId;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * User entity.
 */
@Entity
@Table(name = "User", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})public class User {
    /**
     * User identifier.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * User name.
     */
    @NotBlank
    @Size(min=3, max = 50)
    private String name;

    /**
     * User pseudo.
     */
    @NotBlank
    @Size(min=3, max = 50)
    private String username;

    /**
     * User email which serve as login credential.
     */
    @NaturalId
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    /**
     * User password.
     */
    @NotBlank
    @Size(min=6, max = 100)
    private String password;

    /**
     * User role.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    /**
     * User linked structures.
     */
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumns({
            @JoinColumn(name = "fk_user", referencedColumnName = "id")
    }) private Map<Integer, Structure> structures = new HashMap<Integer, Structure>();

    /**
     * User empty constructor.
     */
    public User() { }


    /**
     * User constructor.
     * @param name
     * @param username
     * @param email
     * @param password
     */
    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

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
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
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
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * User type to set from the roles array.
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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
