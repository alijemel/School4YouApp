package group4.school4you.Repositories;

import group4.school4you.Entities.Recurrence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurrenceRepository extends JpaRepository<Recurrence, Long> {

}
