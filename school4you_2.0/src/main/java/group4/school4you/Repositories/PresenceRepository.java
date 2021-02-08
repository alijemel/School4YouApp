package group4.school4you.Repositories;


import group4.school4you.Entities.Presence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * This interface represents the table in the database where presence objects are stored. With creating instances of this
 * interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface PresenceRepository extends JpaRepository<Presence, Long> {
    Presence findByAppointmentIdAndStudentId(Long appointmentId,
                                             Long studentId);
}
