package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Grade {

    @Id
    @GeneratedValue
    private Long id;
    private Long studentId;
    private Long examId;
    private double grade;
    private boolean isPassed;

    public Grade(){}

    public Grade(Long studentId, Long examId, double grade) {
        this.studentId = studentId;
        this.examId = examId;
        this.grade = grade;
        this.isPassed = (grade <= 4.0);
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

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long appointmentId) {
        this.examId = appointmentId;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
        this.isPassed = (grade <= 4.0);
    }

    public boolean isPassed() {
        return isPassed;
    }

    public void setPassed(boolean passed) {
        isPassed = passed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Grade grade1 = (Grade) o;
        return Double.compare(grade1.grade, grade) == 0 &&
                id.equals(grade1.id) &&
                studentId.equals(grade1.studentId) &&
                examId.equals(grade1.examId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, studentId, examId, grade);
    }

    @Override
    public String toString() {
        return "Grade{" +
                "id=" + id +
                ", studentId=" + studentId +
                ", appointmentId=" + examId +
                ", grade=" + grade +
                ", isPassed=" + isPassed +
                '}';
    }
}
