package group4.school4you.Objects;

import group4.school4you.Entities.Exam;
import group4.school4you.Entities.Grade;

import java.util.Objects;

// representiert eine pruefung und ihre note.
public class GradeObject {

    private Exam exam;
    private Grade grade;

    public GradeObject(Exam exam, Grade grade) {
        this.exam = exam;
        this.grade = grade;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GradeObject that = (GradeObject) o;
        return Objects.equals(exam, that.exam) &&
                Objects.equals(grade, that.grade);
    }

    @Override
    public int hashCode() {
        return Objects.hash(exam, grade);
    }

    @Override
    public String toString() {
        return "GradeObject{" +
                "exam=" + exam +
                ", grade=" + grade +
                '}';
    }
}
