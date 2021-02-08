package group4.school4you.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Teacher extends User {

    @ManyToMany
    @JsonIgnore
    private List<SchoolClass> classes;

    public Teacher(){}
    public Teacher (String firstName, String lastName, String email
            ,String password, String role, LocalDate birthDate) {
        super(firstName,lastName,email,password,role,birthDate);
        this.classes = new ArrayList<>();
    }

    @JsonIgnore
    public List<SchoolClass> getClasses() {
        return classes;
    }

    @JsonProperty
    public void setClasses(List<SchoolClass> classes) {
        this.classes = classes;
    }

    public SchoolClass addClass(SchoolClass schoolClass) {
        if (schoolClass != null) {
            this.classes.add(schoolClass);
        }
        //ELSE THROW EXCEPTION
        return schoolClass;
    }

    public SchoolClass removeClass(SchoolClass schoolClass) {
        if(schoolClass != null && this.classes.contains(schoolClass)) {
            this.classes.remove(schoolClass);
        } //ELSE THROW EXCEPTION
        return schoolClass;
    }
}
