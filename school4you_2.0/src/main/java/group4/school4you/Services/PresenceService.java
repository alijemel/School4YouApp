package group4.school4you.Services;


import group4.school4you.Entities.Presence;
import group4.school4you.Repositories.PresenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
/**
 * This service provides some helping methods for the presence resource.
 */
public class PresenceService {
    @Autowired
    private PresenceRepository presenceRepository;

    /**
     * This method gets a presence for a certain appointment and a certain student.
     * @param appointmentId The id of the appointment we want the presence of.
     * @param studentId The id of the student we want the presence of.
     * @return The presence for the combination of an appointment and student.
     */
    public Presence findPresenceByAppointmentIdAndStudentId(Long appointmentId,
                                                            Long studentId) {
        return presenceRepository.findByAppointmentIdAndStudentId(appointmentId, studentId);
    }

    /**
     * This method creates a presence and stores it in the database.
     * @param newPresence The new presence object.
     * @return The presence repository with the new presence object in it.
     */
    public Presence createPresence(Presence newPresence) {
       return presenceRepository.save(newPresence);
    }

    /**
     * This method edits an existing presence object.
     * @param presenceId The id of the presence object we want to edit.
     * @param isPresent The boolean attribute of the presence.
     * @return The edited presence object.
     */
    public Presence editPresence(Long presenceId, boolean isPresent) {
        Presence toEdit = presenceRepository.findById(presenceId).get();
        toEdit.setPresent(isPresent);
        return presenceRepository.save(toEdit);
    }
}
