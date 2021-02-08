package group4.school4you.Resources;


import group4.school4you.Entities.Exam;
import group4.school4you.Objects.DateAndSlot;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class ExamResource {

    @Autowired
    private ExamService examService;

    /**
     * Gets exams of a school-class.
     *
     * @param classId Id of the school-class.
     * @return list with exams of this school-class.
     */
    @GetMapping(path = "/exams/class/{classId}")
    public List<Exam> getExamsByClassId(@PathVariable Long classId) {
        return examService.findAllByClassId(classId);
    }


    /**
     * Gets the dates that are not available for a teacher for schedueling an
     * exam.
     *
     * @param teacherId Id of the teacher who makes the exam.
     * @param classId   Id of the class to plan the exam for.
     * @return List of dates not available to set an exam for this class by
     * this teacher.
     */
    @GetMapping(path = "/exams/constraints/{teacherId}/{classId}/unavailable")
    public List<DateAndSlot> getUnavailableDatesByTeacherIdAndClassId
    (@PathVariable Long teacherId, @PathVariable Long classId) {
        return examService.getUnavailableByTeacherAndClass(teacherId, classId);
    }

    /**
     * Creates an exam.
     *
     * @param newExam exam to be created.
     * @return Response Object with the created exam and a message.
     */
    @PostMapping(path = "/exams/create")
    public ResponseObject createExam(@RequestBody Exam newExam) {
        return examService.createExam(newExam);
    }

    /**
     * Deletes an exam by Id.
     *
     * @param examId Id of the exam to be deleted.
     * @return Response object with the deleted exam and a message.
     */
    @DeleteMapping(path = "/exams/delete/{examId}")
    public ResponseObject deleteExam(@PathVariable Long examId) {
        return examService.deleteExam(examId);
    }

}
