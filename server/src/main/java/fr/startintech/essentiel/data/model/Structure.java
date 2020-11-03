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
     * @return Structure address.
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address Structure address to set.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return Structure type.
     */
    public String getType() {
        return type;
    }

    /**
     * Structure type to set from the types array.
     * @param typeId Position id in the types array.
     * @throws Exception Throws an exception if id doesnt match.
     */
    public void setType(int typeId) throws Exception {
        switch (typeId) {
            case 1 -> this.type = types[0];
            case 2 -> this.type = types[1];
            case 3 -> this.type = types[2];
            default -> throw new Exception();
        }
    }

    /**
     * @return Structure longitude.
     */
    public String getLongitude() {
        return longitude;
    }

    /**
     * @param longitude Structure longitude to set.
     */
    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    /**
     * @return Structure latitude.
     */
    public String getLatitude() {
        return latitude;
    }

    /**
     * @param latitude Structure latitude to set.
     */
    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    /**
     * @return Structure last update time.
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * @param updatedAt Structure last update time to set.
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * @return Structure created_at time.
     */
    public Date getCreatedAt() {
        return createdAt;
    }
}
