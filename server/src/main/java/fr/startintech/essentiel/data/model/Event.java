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
     * Event start time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_time", nullable = true)
    private Date startTime;

    /**
     * Event end time.
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_time", nullable = true)
    private Date endTime;

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
     * Event address.
     */
    @Column(name = "address", nullable = true)
    private String address;

    /**
     * Event structure organizer.
     */
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "structure_id")
    private Structure organizer;

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
     * @return Event name.
     */
    public String getName() {
        return name;
    }

    /**
     * @param name Event name to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return Event start time.
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * @param startTime Event start time to set.
     */
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    /**
     * @return Event end time.
     */
    public Date getEndTime() {
        return endTime;
    }

    /**
     * @param endTime Event end time to set.
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * @return Event created_at time.
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * @return Event last update time.
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * @param updatedAt Event last update time to set.
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * @return Event address.
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address Event address to set.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return Structure organizer
     */
    public Structure getOrganizer() {
        return organizer;
    }

    /**
     * @param organizer Structure organizer to set.
     */
    public void setOrganizer(Structure organizer) {
        this.organizer = organizer;
    }
}
