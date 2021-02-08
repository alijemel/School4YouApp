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

    @PostMapping (path = "/sickNotes/create")
    public ResponseObject createSickNote(@RequestBody SickNote sickNote) {
//        try {
//            TRY CATCH BLOCK FOR ILLEGALARGUMENTEXCEPTION
//        }

        sickNoteRepository.save(sickNote);

        return new ResponseObject(sickNote, "Krankmeldung erstellt!");

    }

    @PutMapping (path = "/sickNotes/approve/{noteId}")
    public void approveSickNoteById(@PathVariable Long noteId) {
        SickNote targetNote = sickNoteRepository.findById(noteId).get();
        targetNote.setApproved(true);
        sickNoteRepository.save(targetNote);
    }

    @PutMapping (path = "/sickNotes/disapprove/{noteId}")
    public void disapproveSickNoteById(@PathVariable Long noteId) {
        SickNote targetNote = sickNoteRepository.findById(noteId).get();
        targetNote.setApproved(false);
        sickNoteRepository.save(targetNote);
    }

    // Administration gets the sicknotes of users that are in the future and
    //still not approved
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
    @GetMapping (path = "/administration/sickNotes/approved/{roleAsString}")
    List<SickNote> getAllApprovedSickNotesByRole(@PathVariable
                                                           String roleAsString){
        //Hier parameter exception
        Role targetRole = Role.valueOf(roleAsString);
        return sickNoteRepository
                .findAllByRoleAndAndApprovedAndStartDateIsAfter(targetRole,
                        true, LocalDate.now());
    }





    @DeleteMapping (path = "/administration/sickNotes/delete/{noteId}")
    public void deleteSickNoteById(@PathVariable Long noteId) {
        sickNoteRepository.deleteById(noteId);
    }


    // Previous section was for administration , Next section for displaying
    // the sicknotes to parents students and teachers

    @GetMapping (path = "/notifications/sickNotes/{classId}/{roleAsString}")
    public List<SickNote>
    getAllSickNotesByClassAndRole(@PathVariable String roleAsString,
                                  @PathVariable Long classId) {
        return sickNoteService.getAllSickNotesByClassAndRole(roleAsString,
                classId);
    }





}
