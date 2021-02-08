package group4.school4you.Entities;

import group4.school4you.Objects.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Inbox {

    @Id
    @GeneratedValue
    private Long id;
    private Role role;
    @ManyToMany
    private List<Announcement> announcements;

    public Inbox(){}

    public Inbox(Role role) {
        this.role = role;
        announcements = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role scope) {
        this.role = scope;
    }

    public List<Announcement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<Announcement> announcements) {
        this.announcements = announcements;
    }

    public void addAnnouncement(Announcement announcement) {
        this.announcements.add(announcement);
    }
}
