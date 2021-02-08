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

    @GetMapping(path = "/presence/{appointmentId}/{studentId}")
    public Presence getPresenceByAppointmentIdAndStudentId(@PathVariable Long appointmentId,
                                                           @PathVariable Long studentId ) {
        return presenceService
                .findPresenceByAppointmentIdAndStudentId(appointmentId, studentId);

    }

    @PostMapping (path = "/presence/create")
    public Presence createPresence(@RequestBody Presence newPresence) {
        return presenceService.createPresence(newPresence);
    }


    @PutMapping (path = "/presence/{presenceId}/edit/{isPresent}")
    public Presence editPresence(@PathVariable Long presenceId,
                                 @PathVariable boolean isPresent) {
        return presenceService.editPresence(presenceId, isPresent);

    }


}
