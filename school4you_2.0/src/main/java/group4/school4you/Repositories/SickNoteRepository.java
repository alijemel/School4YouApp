package group4.school4you.Repositories;

import group4.school4you.Entities.SickNote;
import group4.school4you.Objects.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SickNoteRepository extends JpaRepository<SickNote,Long> {

    List<SickNote>
    findAllByRoleAndAndApprovedAndStartDateIsAfter(Role role,
                                                     boolean approved,
                                                   LocalDate startDate);

    List<SickNote> findAllByUserIdAndStartDateAfterAndApproved(Long userId,
                                              LocalDate startDate,
                                                               boolean approved );

}
