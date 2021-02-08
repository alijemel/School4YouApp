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
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    ExamRepository examRepository;

    public ResponseObject setGrade(Grade grade) {
        return new ResponseObject(gradeRepository.save(grade),
                "Note Eingetragen!");
    }

    public Grade findGradeByExamIdAndStudentId(Long examId, Long studentId) {
        return gradeRepository.findByExamIdAndStudentId(examId, studentId);
    }

    public ResponseObject deleteGrade(Long gradeId) {
        gradeRepository.deleteById(gradeId);
        return new ResponseObject(HttpStatus.OK, "Note gelöscht!");
    }

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
