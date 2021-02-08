package group4.school4you.Repositories;

import group4.school4you.Entities.Inbox;
import group4.school4you.Objects.Role;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public interface InboxRepository extends JpaRepository<Inbox,Long> {

    boolean existsByRole(Role role);
    Inbox findByRole(Role role);

}
