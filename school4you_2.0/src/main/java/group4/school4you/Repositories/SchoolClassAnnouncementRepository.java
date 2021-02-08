package group4.school4you.Repositories;

import group4.school4you.Entities.SchoolClassAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolClassAnnouncementRepository
        extends JpaRepository <SchoolClassAnnouncement, Long> {

    List<SchoolClassAnnouncement> findAllByClassId(Long classId);


}
