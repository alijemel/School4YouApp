package group4.school4you.Repositories;


import group4.school4you.Entities.Presence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresenceRepository extends JpaRepository<Presence, Long> {
    Presence findByAppointmentIdAndStudentId(Long appointmentId,
                                             Long studentId);
}
