package group4.school4you.Services;

import group4.school4you.Entities.Exam;
import group4.school4you.Entities.Grade;
import group4.school4you.Objects.GradeObject;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Repositories.ExamRepository;
import group4.school4you.Repositories.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
/**
 * This service provides some helping methods for the grade resource.
 */
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    ExamRepository examRepository;

    public ResponseObject setGrade(Grade grade) {
        return new ResponseObject(gradeRepository.save(grade),
                "Note Eingetragen!");
    }

    /**
     * This method finds a certain grade of a given exam and a given student.
     * @param examId The exam we want the grade of.
     * @param studentId The student we want to get the grade of.
     * @return The grade if there is one for the exam and student.
     */
    public Grade findGradeByExamIdAndStudentId(Long examId, Long studentId) {
        return gradeRepository.findByExamIdAndStudentId(examId, studentId);
    }

    /**
     * This method deletes a grade from the repository.
     * @param gradeId The id of the grade we want to delete.
     * @return A responseObject if the grade was deleted successfully.
     */
    public ResponseObject deleteGrade(Long gradeId) {
        gradeRepository.deleteById(gradeId);
        return new ResponseObject(HttpStatus.OK, "Note gelöscht!");
    }

    /**
     * A method to get all grades for a certain student.
     * @param studentId The id of the student we want the grades of.
     * @return A list of grade objects of the student.
     */
    public List<GradeObject> findGradesByStudentId(Long studentId) {
        List<GradeObject> responseGradeList = new ArrayList<>();
        List<Grade> grades = gradeRepository.findAllByStudentId(studentId);
        for (Grade grade : grades) {
            if (examRepository.existsById(grade.getExamId())) {
                Exam exam = (Exam) examRepository.findById(grade.getExamId()).get();
                if (exam != null) {
                    responseGradeList.add(new GradeObject(exam, grade));
                }
            }
        }


        return responseGradeList;
    }
}
