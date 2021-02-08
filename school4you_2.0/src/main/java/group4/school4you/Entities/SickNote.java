package group4.school4you.Entities;

import group4.school4you.Objects.Role;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class SickNote {

    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private Role role;
    private String cause;
    private String comment;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate = LocalDate.now();
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private boolean approved = false;

    public SickNote(){}


    public SickNote(Long userId, String firstName, String lastName,
                    Role role, String cause, String comment,
                    LocalDate startDate, LocalDate endDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.cause = cause;
        this.comment = comment;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public SickNote(Long userId, String cause,
                    String comment, Role role, LocalDate startDate,
                    LocalDate endDate ) {
        this.userId = userId;
        this.cause = cause;
        this.comment = comment;
        this.role = role;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SickNote sickNote = (SickNote) o;
        return id.equals(sickNote.id) &&
                userId.equals(sickNote.userId) &&
                Objects.equals(creationDate, sickNote.creationDate) &&
                Objects.equals(startDate, sickNote.startDate) &&
                Objects.equals(endDate, sickNote.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, creationDate, startDate, endDate);
    }

    @Override
    public String toString() {
        return "SickNote{" +
                "id=" + id +
                ", userId=" + userId +
                ", role=" + role +
                ", cause='" + cause + '\'' +
                ", comment='" + comment + '\'' +
                ", creationDate=" + creationDate +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", approved=" + approved +
                '}';
    }
}
