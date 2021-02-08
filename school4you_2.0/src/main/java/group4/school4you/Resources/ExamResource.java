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

    @GetMapping(path = "/exams/class/{classId}")
    public List<Exam> getExamsByClassId(@PathVariable Long classId) {

        return examService.findAllByClassId(classId);
    }


    @GetMapping(path = "/exams/constraints/{teacherId}/{classId}/unavailable")
    public List<DateAndSlot> getUnavailableDatesByTeacherIdAndClassId
            (@PathVariable Long teacherId, @PathVariable Long classId) {
        return examService.getUnavailableByTeacherAndClass(teacherId, classId);

    }

    @PostMapping(path = "/exams/create")
    public ResponseObject createExam(@RequestBody Exam newExam) {
        return examService.createExam(newExam);
}


@DeleteMapping (path = "/exams/delete/{examId}")
    public ResponseObject deleteExam(@PathVariable Long examId) {
        return examService.deleteExam(examId);
}








}
