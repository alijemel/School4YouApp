package group4.school4you.Entities;

import group4.school4you.Objects.Subject;
import group4.school4you.Objects.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Appointment {

    @Id
    @GeneratedValue
    private Long id;
    private Long classId;
    private Long teacherId;
    private Long recurrenceId;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private DayOfWeek dayOfWeek;
    private String slot;
    private Subject subject;
    private Type type;
    private String teacherName;


    public Appointment(
    ){ this.type = Type.COURSE;}

    public Appointment(Long classId, Long teacherId, LocalDate date, String slot) {
        this.classId = classId;
        this.teacherId = teacherId;
        this.date = date;
        this.slot = slot;
        this.dayOfWeek = date.getDayOfWeek();
        this.type = Type.COURSE;
    }
    public Appointment(Long classId, Long teacherId, LocalDate date,
                       String slot, Subject subject) {
        this.classId = classId;
        this.teacherId = teacherId;
        this.date = date;
        this.slot = slot;
        this.subject = subject;
        this.dayOfWeek = date.getDayOfWeek();
        this.type = Type.COURSE;
    }

    public Appointment(Long classId, LocalDate date, String slot) {
        this.classId = classId;
        this.date=date;
        this.slot = slot;
        this.dayOfWeek = date.getDayOfWeek();
        this.type = Type.COURSE;
    }

    //constructor to set the type (exam or course)

    public Appointment(Long classId, Long teacherId, LocalDate date,
    String slot, Subject subject, Type type) {
        this.classId = classId;
        this.teacherId = teacherId;
        this.date = date;
        this.slot = slot;
        this.subject = subject;
        this.dayOfWeek = date.getDayOfWeek();
        this.type = type;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public DayOfWeek getDayName() {
        return dayOfWeek;
    }

    public void setDayName(DayOfWeek dayName) {
        this.dayOfWeek = dayName;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Long getRecurrenceId() {
        return recurrenceId;
    }

    public void setRecurrenceId(Long recurrenceId) {
        this.recurrenceId = recurrenceId;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return teacherId.equals(that.teacherId) &&
                date.equals(that.date) &&
                slot.equals(that.slot);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, classId, teacherId, date, dayOfWeek, slot, subject);
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", classId=" + classId +
                ", teacherId=" + teacherId +
                ", date=" + date +
                ", dayName='" + dayOfWeek + '\'' +
                ", slot='" + slot + '\'' +
                ", subject='" + subject + '\'' +
                ", type=" + type +
                '}';
    }

    //returns true if the appointment is recurrent
    public boolean isRecurrent() {
        return recurrenceId != null;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }


}
