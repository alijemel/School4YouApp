package group4.school4you.Services;

import group4.school4you.Entities.Appointment;
import group4.school4you.Entities.Exam;
import group4.school4you.Exceptions.ExamCreationException;
import group4.school4you.Objects.DateAndSlot;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Objects.Type;
import group4.school4you.Repositories.AppointmentRepository;
import group4.school4you.Repositories.ExamRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;
    @Autowired
    AppointmentRepository appointmentRepository;

    public Exam findById(Long examId) {
        return (Exam) examRepository.findById(examId).get();
    }


    public List<Exam> findAllByClassId(Long classId) {
        return  examRepository.findAllByClassId(classId);
    }

    public List<Exam> findAllByTeacherId(Long teacherId) {
        return  examRepository.findAllByTeacherId(teacherId);
    }

    //List with DateAndSlot that are in the selected class and exams of the
    // actual
    // teacher in other classes, those dates are not available when a teacher
    // wants to create an exam for a class.
    public List<DateAndSlot> getUnavailableByTeacherAndClass(Long teacherId,
                                                             Long classId) {
        List <DateAndSlot> unavailable = new ArrayList<>();

        List<Exam> teacherExams = findAllByTeacherId(teacherId);
        List<Exam> classExams = findAllByClassId(classId);
        for (Exam exam : classExams) {
            unavailable.add(new DateAndSlot(exam.getDate(), exam.getSlot()));
        }
        for (Exam exam : teacherExams) {
          DateAndSlot  newDateAndSlot = new DateAndSlot(exam.getDate(), exam.getSlot());
            if (!unavailable.contains(newDateAndSlot)) {
                unavailable.add(newDateAndSlot);
            }
        }

        return unavailable;
    }


    //1) if a teacher creates an exam on a time where he has a course : we give
    // delete the course and show a message that he replaced the course by an
    // exam (this can b e in the actual class or another one of his classes.
    //2) If a teacher tries To create an exam on a time where ANOTHER TEACHER
    // of the class has a course : we throw an exception
    public ResponseObject createExam(Exam newData) throws RuntimeException {
        Long classId = newData.getClassId();
        Long teacherId = newData.getTeacherId();
        LocalDate date = newData.getDate();
        String slot = newData.getSlot();


        if (appointmentRepository.
                existsByTeacherIdAndDateAndSlotAndTypeNot(teacherId, date,
                        slot,Type.EXAM)) {
            Appointment toReplace =
                    appointmentRepository.findByTeacherIdAndDateAndSlot(teacherId, date, slot);
            Long replacedClassId = toReplace.getClassId();
            appointmentRepository.delete(toReplace);
            String reponseMessage = "Sie haben eine Prüfung erstellt an einem" +
                    " Datum an dem eine Unterrichtsstunde für Klasse " + replacedClassId +
                    "geplant war. Bitte kontaktieren Sie das " +
                    "Sekretariat oder erstellen Sie eine Klassenankündigung, " +
                    "falls Sie diesen Prüfungstermin nochmal löschen oder " +
                    "ändern! ";
            Exam createdExam = examRepository.save(newData);
            return new ResponseObject(createdExam, reponseMessage);
        } else if(appointmentRepository
                .existsByClassIdAndDateAndSlotAndTypeIsNot(classId,date,
                        slot,Type.EXAM)) {
            return new ResponseObject(null,"An diesen Termin ist ein " +
                    "Unterricht von einem anderen Lehrer, bitte Kollegen " +
                    "ansprechen oder Sekretariat kontaktieren. "
                    );
        } else {
            // Don t forget to set the name of the teacher for the frontend

            return new ResponseObject(examRepository.save(newData),
                    "Prüfungstermin erfolgreich angelegt.");
        }

    }

    public ResponseObject deleteExam(Long examId) {
        Exam toDelete = findById(examId);
        examRepository.delete(toDelete);
        String message = toDelete.getSubject().toString() + " Prüfung am " +
                toDelete.getDate().toString() +" um " +toDelete.getSlot() + " gel" +
                "öscht!";
        return new ResponseObject(toDelete, message);
    }
}
