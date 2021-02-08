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
public class GradeResource {

    @Autowired
    GradeService gradeService;

    @GetMapping (path = "/grades/{examId}/{studentId}")
    public Grade getGradeByExamIdAndStudentId(@PathVariable Long examId,
                                              @PathVariable Long studentId) {
        return gradeService
                .findGradeByExamIdAndStudentId(examId, studentId);
    }




    @PostMapping (path = "/grades/set")
    public ResponseObject setGrade(@RequestBody Grade grade) {
        return gradeService.setGrade(grade);
    }

    @DeleteMapping (path = "/grades/delete/{gradeId}")
    public ResponseObject deleteGradeById(@PathVariable Long gradeId){
        return gradeService.deleteGrade(gradeId);

    }

    @GetMapping (path = "/grades/{studentId}")
    public List<GradeObject> getGradesByStudentId(@PathVariable Long studentId){
        return gradeService.findGradesByStudentId(studentId);
    }



}
