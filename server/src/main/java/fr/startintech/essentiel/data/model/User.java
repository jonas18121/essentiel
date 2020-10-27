package fr.startintech.essentiel.data.model;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "role", nullable = true)
    private String role;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumns({
            @JoinColumn(name = "fk_user", referencedColumnName = "id")
    }) private Map<Integer, Structure> structures = new HashMap<Integer, Structure>();

    private static final String[] roles = {"administrator", "moderator", "contributor"};

    public User() { }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) throws Exception {
        switch (role) {
            case "admin", "administrator" -> this.role = roles[0];
            case "modo", "moderator" -> this.role = roles[1];
            case "user", "contributor" -> this.role = roles[2];
            default -> throw new Exception();
        }
    }

    public void setRole(int roleId) throws Exception {
        switch (roleId) {
            case 1 -> this.role = roles[0];
            case 2 -> this.role = roles[1];
            case 3 -> this.role = roles[2];
            default -> throw new Exception();
        }
    }

    public Map<Integer, Structure> getStructures() {
        return structures;
    }

    public void setStructures(Map<Integer, Structure> structures) {
        this.structures = structures;
    }
}
