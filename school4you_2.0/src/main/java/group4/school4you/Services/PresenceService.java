package group4.school4you.Services;


import group4.school4you.Entities.Presence;
import group4.school4you.Repositories.PresenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class PresenceService {
    @Autowired
    private PresenceRepository presenceRepository;


    public Presence findPresenceByAppointmentIdAndStudentId(Long appointmentId,
                                                            Long studentId) {
        return presenceRepository.findByAppointmentIdAndStudentId(appointmentId, studentId);
    }

    public Presence createPresence(Presence newPresence) {
       return presenceRepository.save(newPresence);
    }

    public Presence editPresence(Long presenceId, boolean isPresent) {
        Presence toEdit = presenceRepository.findById(presenceId).get();
        toEdit.setPresent(isPresent);
        return presenceRepository.save(toEdit);
    }
}
