package group4.school4you.Resources;

import group4.school4you.Entities.Announcement;
import group4.school4you.Entities.Inbox;
import group4.school4you.Objects.Role;
import group4.school4you.Repositories.AnnouncementRepository;
import group4.school4you.Repositories.InboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
/**
 * This class handles all requests from the frontend for announcements.
 */
public class AnnouncementResource {

    @Autowired
    AnnouncementRepository announcementRepository;
    @Autowired
    InboxRepository inboxRepository;

    /**
     * Creates an announcement.
     *
     * @param announcement announcement to be created.
     * @return created announcement.
     */
    @PostMapping(path = "/announcements/new")
    public Announcement createAnnouncement(
            @RequestBody Announcement announcement) {
        Announcement newAnnouncement = new
                Announcement(announcement.getSubject(), announcement.getContent());
        newAnnouncement.setCreatorId(announcement.getCreatorId());
        newAnnouncement.setCreatorFirstName(announcement.getCreatorFirstName());
        newAnnouncement.setCreatorLastName(announcement.getCreatorLastName());
        newAnnouncement.setCreatorRole(announcement.getCreatorRole());
        newAnnouncement.setVisibility(announcement.getVisibility());
        announcementRepository.save(newAnnouncement);
        for (Role role : newAnnouncement.getVisibility()) {
            Inbox inbox = inboxRepository.findByRole(role);
            inbox.addAnnouncement(newAnnouncement);
            newAnnouncement.addInbox(inbox);
            inboxRepository.save(inbox);
        }
        return announcementRepository.save(newAnnouncement);
    }

    /**
     * Edits an announcement.
     *
     * @param id      Id of the announcement to be edited.
     * @param neuData edited Announcement.
     * @return announcement after edit.
     */
    @Transactional
    @PutMapping(path = "/announcements/edit/{id}")
    public Announcement editAnnouncement(@PathVariable Long id,
                                         @RequestBody Announcement neuData) {

        Announcement toEdit = announcementRepository.findById(id).get();
        toEdit.setSubject(neuData.getSubject());
        toEdit.setContent(neuData.getContent());
        toEdit.setVisibility(neuData.getVisibility());

        return announcementRepository.save(toEdit);
    }

    /**
     * Deletes an announcement by its Id.
     *
     * @param id Id of the announcement to be deleted.
     * @return Response entity with a message and HTTP status.
     */
    @Transactional
    @DeleteMapping(path = "/announcements/delete/{id}")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Long id) {
        Announcement toDelete = announcementRepository.findById(id).get();
        for (Inbox inb : toDelete.getInboxes()) {
            Inbox current = inboxRepository.findById(inb.getId()).get();
            current.getAnnouncements().remove(toDelete);
        }
        if (toDelete.getInboxes().isEmpty()) {
            announcementRepository.deleteById(id);
        }
        return new ResponseEntity<>("Announcement deleted", HttpStatus.OK);
    }

    /**
     * Gets the inbox of a specific role Containing the announcements for
     * this role.
     *
     * @param role role corresponding to the inbox.
     * @return the inbox containing the announcements.
     */
    @GetMapping(path = "/inbox/{role}")
    public Inbox getInboxByRole(@PathVariable Role role) {

        return inboxRepository.findByRole(role);
    }
}
