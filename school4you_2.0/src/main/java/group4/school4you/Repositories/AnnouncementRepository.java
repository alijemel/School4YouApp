package group4.school4you.Repositories;

import group4.school4you.Entities.Announcement;
import group4.school4you.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * This interface represents the table in the database where announcement objects are stored. With creating instances
 * of this interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface AnnouncementRepository extends JpaRepository<Announcement,
        Long> {

}
