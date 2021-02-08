package group4.school4you.Entities;

import group4.school4you.Objects.Subject;
import group4.school4you.Objects.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Exam extends Appointment {

    private String description;
    private int coefficient;

    public Exam(){}

    public Exam(Long classId, Long teacherId, LocalDate date,
                       String slot, Subject subject) {
        super(classId,teacherId,date,slot,subject, Type.EXAM);
    }

    public Exam(Long classId, Long teacherId, LocalDate date,
                String slot, Subject subject, String description, int coefficient) {
        super(classId,teacherId,date,slot,subject, Type.EXAM);
        this.description = description;
        this.coefficient = coefficient;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(int coefficient) {
        this.coefficient = coefficient;
    }

    @Override
    public Type getType() {
        return Type.EXAM;
    }

    @Override
    public String toString() {
        return "Exam{" +
                "description='" + description + '\'' +
                ", coefficient=" + coefficient +
                '}';
    }
}
