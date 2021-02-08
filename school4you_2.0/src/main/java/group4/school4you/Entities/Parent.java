package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Parent extends User {

    private Long familyId;
//    @ManyToMany
//    private List<Student> children;
    public Parent(){}
    public Parent(String firstName, String lastName, String email
            ,String password, String role, LocalDate birthDate) {
        super(firstName,lastName,email,password,role,birthDate);
//        this.children = new ArrayList<>();
    }

    public Long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

//    public List<Student> getChildren() {
//        return children;
//    }
//
//    public void setChildren(List<Student> children) {
//        this.children = children;
//    }
}
