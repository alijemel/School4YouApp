package group4.school4you.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import group4.school4you.Objects.Role;
import group4.school4you.Objects.Visibility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Announcement {

    @Id
    @GeneratedValue
    private Long id;

    private Long creatorId;
    private String creatorFirstName;
    private String creatorLastName;
    private Role creatorRole;
    private String subject;
    @Lob
    @Column(length=2000)
    private String content;
    @ElementCollection
    private List<Role> visibility;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate = LocalDate.now();
    @JsonIgnore
    @ManyToMany
    private List<Inbox> inboxes;

    public Announcement(){
    }
    public Announcement(String subject, String content) {
        this.subject = subject;
        this.content = content;
        this.inboxes = new ArrayList<>();
    }

    @JsonIgnore
    public List<Inbox> getInboxes() {
        return inboxes;
    }

    @JsonProperty
    public void setInboxes(List<Inbox> inboxes) {
        this.inboxes = inboxes;
    }

    public void addInbox(Inbox inbox) {
        this.inboxes.add(inbox);
    }

    public String getCreatorFirstName() {
        return creatorFirstName;
    }

    public void setCreatorFirstName(String creatorFirstName) {
        this.creatorFirstName = creatorFirstName;
    }

    public List<Role> getVisibility() {
        return visibility;
    }

    public void setVisibility(List<Role> visibility) {
        this.visibility = visibility;
    }

    public String getCreatorLastName() {
        return creatorLastName;
    }

    public void setCreatorLastName(String getCreatorLastName) {
        this.creatorLastName = getCreatorLastName;
    }

    public Role getCreatorRole() {
        return creatorRole;
    }

    public void setCreatorRole(Role getCreatorRole) {
        this.creatorRole = getCreatorRole;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    @Override
    public String toString() {
        return "Announcement{" +
                "subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                ", creationDate=" + creationDate +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}
