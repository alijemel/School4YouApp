package group4.school4you.Entities;

import group4.school4you.Objects.Role;

import javax.persistence.*;
import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class SchoolClassInbox extends Inbox {

    @Id
    @GeneratedValue
    private Long id;
    private Long classId;

    @ManyToMany
    private List<SickNote> sickNotes;

    public SchoolClassInbox(){}

    public SchoolClassInbox(Long classId) {
        super(Role.SCHOOL_CLASS);
        this.classId = classId;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public List<SickNote> getSickNotes() {
        return sickNotes;
    }

    public void setSickNotes(List<SickNote> sickNotes) {
        this.sickNotes = sickNotes;
    }

    @Override
    public String toString() {
        return "SchoolClassInbox{" +
                "id=" + id +
                ", classId=" + classId +
                '}';
    }
}
