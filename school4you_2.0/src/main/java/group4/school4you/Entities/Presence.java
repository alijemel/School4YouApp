package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Presence {

    @Id
    @GeneratedValue
    private Long id;
    private Long studentId;
    private Long appointmentId;
    private boolean isPresent;

    public Presence(){}

    public Presence(Long studentId, Long appointmentId, boolean isPresent) {
        this.studentId = studentId;
        this.appointmentId = appointmentId;
        this.isPresent = isPresent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public boolean isPresent() {
        return isPresent;
    }

    public void setPresent(boolean present) {
        isPresent = present;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Presence presence = (Presence) o;
        return id.equals(presence.id) &&
                studentId.equals(presence.studentId) &&
                appointmentId.equals(presence.appointmentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, studentId, appointmentId);
    }

    @Override
    public String toString() {
        return "Presence{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", appointmentId=" + appointmentId +
                ", isPresent=" + isPresent +
                '}';
    }
}
