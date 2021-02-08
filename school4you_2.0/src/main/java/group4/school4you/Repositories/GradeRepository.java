package group4.school4you.Repositories;

import group4.school4you.Entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository <Grade, Long> {

Grade findByExamIdAndStudentId(Long examId, Long studentId);

List<Grade> findAllByStudentId(Long studentId);

}
