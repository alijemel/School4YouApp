package group4.school4you.Repositories;

import group4.school4you.Entities.SchoolClassAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * This interface represents the table in the database where schoolClassAnnouncements objects are stored.
 * With creating instances of this interface the backend is able to communicate with the database tables and manipulate
 * them.
 */
public interface SchoolClassAnnouncementRepository
        extends JpaRepository <SchoolClassAnnouncement, Long> {

    List<SchoolClassAnnouncement> findAllByClassId(Long classId);


}
