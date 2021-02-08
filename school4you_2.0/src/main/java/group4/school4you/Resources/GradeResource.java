package group4.school4you.Resources;

import group4.school4you.Entities.Grade;
import group4.school4you.Objects.GradeObject;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
/**
 * This class handles all requests from the frontend for grades.
 */
public class GradeResource {

    @Autowired
    GradeService gradeService;

    /**
     * Gets the grade of a student in an exam.
     *
     * @param examId    Id of the exam.
     * @param studentId Id of the student.
     * @return the grade of the student at the exam.
     */
    @GetMapping(path = "/grades/{examId}/{studentId}")
    public Grade getGradeByExamIdAndStudentId(@PathVariable Long examId,
                                              @PathVariable Long studentId) {
        return gradeService
                .findGradeByExamIdAndStudentId(examId, studentId);
    }


    /**
     * Sets a grade by creating a grade object.
     *
     * @param grade unique grade that defines the gradfe of a student in an
     *              exam.
     * @return Response Object with the grade and a message.
     */
    @PostMapping(path = "/grades/set")
    public ResponseObject setGrade(@RequestBody Grade grade) {
        return gradeService.setGrade(grade);
    }

    /**
     * Deletes grade by Id.
     *
     * @param gradeId Id of the grade to be deleted.
     * @return Response Object with deleted grade and message.
     */
    @DeleteMapping(path = "/grades/delete/{gradeId}")
    public ResponseObject deleteGradeById(@PathVariable Long gradeId) {
        return gradeService.deleteGrade(gradeId);
    }

    /**
     * Gets all grades of a student by student Id.
     *
     * @param studentId Id of the student.
     * @return List of Grades of the student.
     */
    @GetMapping(path = "/grades/{studentId}")
    public List<GradeObject> getGradesByStudentId(@PathVariable Long studentId) {
        return gradeService.findGradesByStudentId(studentId);
    }
}
