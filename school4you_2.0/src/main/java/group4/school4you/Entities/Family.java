package group4.school4you.Entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
/**
 * With this class the secretary members are able to create families. They put existing parents and students together
 * and create a family.
 */
public class Family {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String pseudo;
    @OneToMany
    private List<Student> students;
    @OneToMany
    private List<Parent> parents;
    

    public Family(){
    }

    public Family(String name){
        this.name = name;
        this.students = new ArrayList<>();
        this.parents = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String key) {
        this.pseudo = key;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> children) {
        this.students = children;
    }

    public List<Parent> getParents() {
        return parents;
    }

    public void setParents(List<Parent> parents) {
        this.parents = parents;
    }

    public List<Student> addChild(Student student){
        this.students.add(student);
        student.setFamilyId(this.id);
        return students;
    }

    public List<Parent> addParent(Parent parent){
        if (this.parents.size() <= 2){
            this.parents.add(parent);
            parent.setFamilyId(this.id);
        } return parents;
    }

    public List<Student> removeChild(Student student){
        if (this.students.contains(student)){
            this.students.remove(student);
            student.setFamilyId(null);
        }return students;
    }

    public List<Parent> removeParent(Parent parent){
        if(this.parents.contains(parent)){
            this.parents.remove(parent);
            parent.setFamilyId(null);
        } return parents;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Family family = (Family) o;
        return id.equals(family.id) &&
                Objects.equals(name, family.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Family{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pseudo='" + pseudo + '\'' +
                '}';
    }
}
