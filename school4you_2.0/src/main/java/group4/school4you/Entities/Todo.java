package group4.school4you.Entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Todo {

//Id is long because null would mean nothing stored
    @Id
    @GeneratedValue
    @SequenceGenerator(name="TABLEA_ID_GENERATOR",
            sequenceName="MYSCHEMA.SEQ_TABLEA", allocationSize=1)
    private Long id;
    private String username;
    private String description;
    private Date targetDate;
    private boolean isDone;

    //DEFAULT CONSTRUCTOR FOR AUTOMATIC CREATION OF RESPONSE OBJECTS

    protected Todo(){}
    public Todo(long id, String username, String description, Date targetDate
            , boolean isDone) {
        this.id=id;
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
        this.isDone = isDone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(Date targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return id == todo.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

