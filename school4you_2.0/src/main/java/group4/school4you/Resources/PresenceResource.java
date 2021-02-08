package group4.school4you.Resources;

import group4.school4you.Entities.Presence;
import group4.school4you.Services.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PresenceResource {

    @Autowired
    private PresenceService presenceService;

    /**
     * Returns the unique presence of a student at an appointment.
     *
     * @param appointmentId Id of the appointment.
     * @param studentId Id of the student.
     */
    @GetMapping(path = "/presence/{appointmentId}/{studentId}")
    public Presence getPresenceByAppointmentIdAndStudentId(@PathVariable Long appointmentId,
                                                           @PathVariable Long studentId ) {
        return presenceService
                .findPresenceByAppointmentIdAndStudentId(appointmentId, studentId);

    }

    /**
     * Creates a presence entity.
     *
     * @param newPresence the presence to be created.
     * @return the created presence object.
     */
    @PostMapping (path = "/presence/create")
    public Presence createPresence(@RequestBody Presence newPresence) {
        return presenceService.createPresence(newPresence);
    }


    /**
     * Edits a presence entity, sets the presence to true or false.
     *
     * @param presenceId presence entity to be edited.
     * @param isPresent true if it should represent a presence, false if it
     *                  represents absence.
     * @return the edited presence object.
     */
    @PutMapping (path = "/presence/{presenceId}/edit/{isPresent}")
    public Presence editPresence(@PathVariable Long presenceId,
                                 @PathVariable boolean isPresent) {
        return presenceService.editPresence(presenceId, isPresent);

    }
}
