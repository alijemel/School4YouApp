package group4.school4you.Repositories;

import group4.school4you.Entities.Appointment;
import group4.school4you.Entities.Exam;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ExamRepository extends AppointmentRepository {


    List<Exam> findAllByClassId(Long classId);

    @Query("FROM Exam")
    List<Exam> findAllByTeacherIdAndClassIdNot(Long teacherId, Long classId);

//    @Query("FROM Exam")
//    List<Exam> findAllByClassIdAndTeacherIdNot(Long classId, Long teacherId);

    @Query("FROM Exam")
    List<Exam> findAllByTeacherId(Long teacherId);




}
