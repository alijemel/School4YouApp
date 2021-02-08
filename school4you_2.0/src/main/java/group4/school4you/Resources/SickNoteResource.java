package group4.school4you.Resources;

import group4.school4you.Entities.SickNote;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Objects.Role;
import group4.school4you.Repositories.SickNoteRepository;
import group4.school4you.Services.SickNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class SickNoteResource {

    @Autowired
    private SickNoteService sickNoteService;
    @Autowired
    private SickNoteRepository sickNoteRepository;

    /**
     * Saves a new Sick-note in the database.
     *
     * @param sickNote the new note to be saved.
     * @return Response Object containing the new note and a message.
     */
    @PostMapping (path = "/sickNotes/create")
    public ResponseObject createSickNote(@RequestBody SickNote sickNote) {
        sickNoteRepository.save(sickNote);
        return new ResponseObject(sickNote, "Krankmeldung erstellt!");
    }

    /**
     * Changes the status of a sick-note to approved. this is a functionality
     * used by the secretary to approve the sick-notes.
     *
     * @param noteId Id of the note to be approved.
     */
    @PutMapping (path = "/sickNotes/approve/{noteId}")
    public void approveSickNoteById(@PathVariable Long noteId) {
        SickNote targetNote = sickNoteRepository.findById(noteId).get();
        targetNote.setApproved(true);
        sickNoteRepository.save(targetNote);
    }

    /**
     * Changes the status of a sick-note to unapproved. this is a functionality
     * used by the secretary to approve the sick-notes.
     *
     * @param noteId Id of the note to be approved.
     */
    @PutMapping (path = "/sickNotes/disapprove/{noteId}")
    public void disapproveSickNoteById(@PathVariable Long noteId) {
        SickNote targetNote = sickNoteRepository.findById(noteId).get();
        targetNote.setApproved(false);
        sickNoteRepository.save(targetNote);
    }

    // Administration gets the sicknotes of users that are in the future and
    //still not approved

    /**
     * Retrieves all unapproved sicknotes of a specific role that have a
     * begin date in the future.
     *
     * @param roleAsString String representation of the specified role.
     * @return List of the still not approved sick-notes.
     */
    @GetMapping (path = "/administration/sickNotes/unapproved/{roleAsString}")
    List<SickNote> getAllUnapprovedSickNotesByRole(@PathVariable
                                                           String roleAsString){
        //Hier parameter exception
        Role targetRole = Role.valueOf(roleAsString);
        return sickNoteRepository
                .findAllByRoleAndAndApprovedAndStartDateIsAfter(targetRole,
                        false, LocalDate.now());
    }

    //Administration gets the notes that are already approved and can
    // unapprove them

    /**
     * Retrieves all approved sick-notes of a specific role that have a
     * begin date in the future.
     *
     * @param roleAsString String representation of the specified role.
     * @return List of the approved sick-notes.
     */
    @GetMapping (path = "/administration/sickNotes/approved/{roleAsString}")
    List<SickNote> getAllApprovedSickNotesByRole(@PathVariable
                                                           String roleAsString){
        //Hier parameter exception
        Role targetRole = Role.valueOf(roleAsString);
        return sickNoteRepository
                .findAllByRoleAndAndApprovedAndStartDateIsAfter(targetRole,
                        true, LocalDate.now());
    }

    /**
     * Finds the sick-note corresponding to the specified Id and deletes it
     * from the database.
     *
     * @param noteId Id of the note to be deleted.
     */
    @DeleteMapping (path = "/administration/sickNotes/delete/{noteId}")
    public void deleteSickNoteById(@PathVariable Long noteId) {
        sickNoteRepository.deleteById(noteId);
    }


    // Previous section was for administration , Next section for displaying
    // the sicknotes to parents students and teachers

    /**
     * Retrieves all sick-notes of users with the specified role that are in
     * the same specified class. For example of all students or all teachers
     * in a same class.
     * Calls the service to filter results so only notes that are approved
     * and in the future are retrieved.
     *
     * @param roleAsString String representation of the specified role.
     * @param classId Id of the class.
     * @return
     */
    @GetMapping (path = "/notifications/sickNotes/{classId}/{roleAsString}")
    public List<SickNote>
    getAllSickNotesByClassAndRole(@PathVariable String roleAsString,
                                  @PathVariable Long classId) {
        return sickNoteService.getAllSickNotesByClassAndRole(roleAsString,
                classId);
    }
}
