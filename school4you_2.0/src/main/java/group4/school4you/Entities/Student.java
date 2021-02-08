package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Student extends User {

    private Long familyId;
    private Long classId;
    public Student(){}
    public Student(String firstName, String lastName, String email
            ,String password, String role, LocalDate birthDate) {
        super(firstName,lastName,email,password,role,birthDate);
    }

    public Long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Student student = (Student) o;
        return Objects.equals(familyId, student.familyId) &&
                Objects.equals(classId, student.classId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), familyId, classId);
    }

    @Override
    public String toString() {
        return "Student{" +
                "familyId=" + familyId +
                ", classId=" + classId +
                '}';
    }
}
