package group4.school4you.Repositories;

import group4.school4you.Entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * This interface represents the table in the database where grade objects are stored. With creating instances of this
 * interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface GradeRepository extends JpaRepository <Grade, Long> {

Grade findByExamIdAndStudentId(Long examId, Long studentId);

List<Grade> findAllByStudentId(Long studentId);

}
