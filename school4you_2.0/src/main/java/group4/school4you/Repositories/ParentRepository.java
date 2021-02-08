package group4.school4you.Repositories;

import group4.school4you.Entities.User;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
/**
 * This interface represents the table in the database where parent objects are stored. With creating instances of this
 * interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface ParentRepository extends UserJpaRepository{
    @Override
    @Query("FROM Parent ")
    List<User> findAll();
}
