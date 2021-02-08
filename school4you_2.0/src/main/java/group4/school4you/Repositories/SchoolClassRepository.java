package group4.school4you.Repositories;


import group4.school4you.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import group4.school4you.Entities.SchoolClass;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    @Query("FROM SchoolClass ")
    List<SchoolClass> findAll();

    SchoolClass findByClassName(String name);

}
