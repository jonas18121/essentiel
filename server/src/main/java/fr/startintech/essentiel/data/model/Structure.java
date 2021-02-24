package fr.startintech.essentiel.data.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Structure entity.
 */
@Entity
@Table(name = "Structure")
public class Structure {
    /**
     * Structure identifier.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Structure name.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Structure address
     */
    @Column(name = "address", nullable = true)
    private String address;

    /**
     * Structure type.
     */
    @Column(name = "type", nullable = true)
    private String type;

    /**
     * Structure description.
     */
    @Column(name = "description", nullable = true)
    private String description;

    /**
     * Structure contactName.
     */
    @Column(name = "contactName", nullable = true)
    private String contactName;

    /**
     * Structure contactFunction.
     */
    @Column(name = "contactFunction", nullable = true)
    private String contactFunction;

    /**
     * Structure phone.
     */
    @Column(name = "phone", nullable = true)
    private String phone;

    /**
     * Structure email.
     */
    @Column(name = "email", nullable = true)
    private String email;

    /**
     * Structure label.
     */
    @Column(name = "label", nullable = true)
    private String label;

    /**
     * Structure longitude coordinates.
     */
    @Column(name = "longitude", nullable = true)
    private String longitude;

    /**
     * Structure latitude coordinates.
     */
    @Column(name = "latitude", nullable = true)
    private String latitude;

    /**
     * Structure last update time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = true)
    @LastModifiedDate
    private Date updatedAt;

    /**
     * Structure created time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Date createdAt;

    /**
     * Structure types array
     */
    private static final String[] types = {"type1", "type2", "type3"};

    /**
     * Structure constructor.
     * Initialize created_at field to current time.
     */
    public Structure() {
        this.createdAt = new Date();
    }

    /**
     * @return Structure id.
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id Structure id to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return Structure name.
     */
    public String getName() {
        return name;
    }

    /**
     * @param name Structure name to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return Structure type.
     */
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactFunction() {
        return contactFunction;
    }

    public void setContactFunction(String contactFunction) {
        this.contactFunction = contactFunction;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
