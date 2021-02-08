package group4.school4you.Repositories;

import group4.school4you.Entities.Appointment;
import group4.school4you.Objects.Type;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@Primary
/**
 * This interface represents the table in the database where appointment objects are stored. With creating instances
 * of this interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface AppointmentRepository extends JpaRepository <Appointment,
        Long> {
    List<Appointment> findAllByTeacherIdAndDateAndSlotAndClassIdNot(Long teacherId,
                                                                    LocalDate date,
                                                                    String slot,
                                                                    Long classId);
    boolean existsByTeacherIdAndDateAndSlotAndClassId (
            Long teacherId,
            LocalDate date,
            String slot,
            Long classId
    );

    boolean existsByClassIdAndDateAndSlot(Long classId, LocalDate date,
                                          String slot);

    boolean existsByTeacherIdAndDateAndSlotAndTypeNot(Long teacherId,
                                                      LocalDate date,
                                                      String slot, Type type);

    boolean existsByClassIdAndDateAndSlotAndTypeIsNot(Long classId,
                                                      LocalDate date,
                                                      String slot, Type type);

    Appointment findByClassIdAndTeacherIdAndDateAndSlot(Long classId,
                                                        Long teacherId,
                                                        LocalDate date,
                                                        String slot);
    Appointment findByClassIdAndDateAndSlot (Long classId,
                                             LocalDate date, String slot);

    Appointment findByTeacherIdAndDateAndSlot (Long teacherId,
                                             LocalDate date, String slot);

    //Finds when teachers of this class have appointments in other classes
    List<Appointment> findAllByDateAndSlotAndClassIdNotAndTeacherIdIn(
            LocalDate date, String slot, Long classId, List<Long> teacherIds
    );

    //List<Appointment> findAllByTeacherIdAndDateIs

    void deleteAllByRecurrenceIdAndDateIsGreaterThanEqual(Long recurrenceId, LocalDate date);


    boolean existsByTeacherIdAndDateAndSlot(Long teacherId, LocalDate date,
                                            String slot);
}
