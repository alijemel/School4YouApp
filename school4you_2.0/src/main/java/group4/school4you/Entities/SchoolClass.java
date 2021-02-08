package group4.school4you.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class SchoolClass {
    @Id
    @GeneratedValue
    private Long id;
        private String className;
        @OneToMany
        private List<Student> students;
        @ManyToMany
        private  List<Teacher> teachers;

        private Long inboxId;



    public SchoolClass( ){}
        public SchoolClass(String name){
            this.className = name;
            students = new ArrayList<>();
            teachers = new ArrayList<>();
        }

        public Long getId(){
            return this.id;
        }
        public void setId(Long Id){
            this.id = Id;
        }
        public String getClassName(){
            return this.className;
        }
        public void setClassName(String className){
            this.className = className;
        }


        public List<Student> getStudents(){
            return this.students;
        }
        public List<Teacher> getTeachers(){
            return this.teachers;
        }



        public void addStudent(Student toAdd){
            this.students.add(toAdd);
            toAdd.setClassId(this.id);
        }

        public void removeStudent(Student toRemove) {
            if(this.students.contains(toRemove)){
                this.students.remove(toRemove);
            }
        }

        public boolean containsStudent(Student toCheck){
            return this.students.contains(toCheck);
        }

        public boolean containsTeacher(Teacher toCheck){
            return this.teachers.contains(toCheck);
        }

        public void addTeacher(Teacher toAdd){
        this.teachers.add(toAdd);
        toAdd.addClass(this);

        }

        public void removeTeacher(Teacher toRemove){
        if (teachers.contains(toRemove)) {
            this.teachers.remove(toRemove);
            toRemove.removeClass(this);
        }
        }

    public Long getInboxId() {
        return inboxId;
    }

    public void setInboxId(Long inboxId) {
        this.inboxId = inboxId;
    }
}


