package group4.school4you.Repositories;


import group4.school4you.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import group4.school4you.Entities.SchoolClass;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
/**
 * This interface represents the table in the database where schoolClass objects are stored. With creating instances of this
 * interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    @Query("FROM SchoolClass ")
    List<SchoolClass> findAll();

    SchoolClass findByClassName(String name);

}
