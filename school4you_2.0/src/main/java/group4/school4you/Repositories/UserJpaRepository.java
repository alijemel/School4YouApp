package group4.school4you.Repositories;

import group4.school4you.Entities.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Primary
public interface UserJpaRepository extends JpaRepository<User,Long> {

    User findByEmail(String Email);

     Optional<User> findByResetToken(String resetToken);

     Boolean existsByEmail(String email);
     Boolean existsByResetToken(String resetToken);

    List<User> findAll();
    List<User> findAllByRole(String role);

}
