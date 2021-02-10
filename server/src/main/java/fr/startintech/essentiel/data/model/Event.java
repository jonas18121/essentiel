package fr.startintech.essentiel.data.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Event entity.
 */
@Entity
@Table(name = "Event")
public class Event {
    /**
     * Event identifier.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Event name.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Event date
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = true)
    private Date date;

    /**
     * Event hour.
     */
    @Column(name = "hour", nullable = true)
    private String hour;

    /**
     * Event street.
     */
    @Column(name = "street", nullable = true)
    private String street;

    /**
     * Event city.
     */
    @Column(name = "city", nullable = true)
    private String city;

    /**
     * Event zip.
     */
    @Column(name = "zip", nullable = true)
    private String zip;

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
     * Event structure organizer.
     */
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "structure_id")
    private Structure organizer;

    /**
     * Event public.
     */
    @Column(name = "audience", nullable = true)
    private String audience;

    /**
     * Event price.
     */
    @Column(name = "price", nullable = true)
    private String price;

    /**
     * Event created time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Date createdAt;

    /**
     * Event last update time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = true)
    @LastModifiedDate
    private Date updatedAt;

    /**
     * Event constructor.
     * Initialize created_at field to current time.
     */
    public Event() {
        this.createdAt = new Date();
    }

    /**
     * @return Event id.
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id Event id to set.
     */
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Structure getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Structure organizer) {
        this.organizer = organizer;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
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
}
