package group4.school4you.Repositories;

import group4.school4you.Entities.Announcement;
import group4.school4you.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement,
        Long> {

}
