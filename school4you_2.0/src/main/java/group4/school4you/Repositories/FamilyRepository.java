package group4.school4you.Repositories;

import group4.school4you.Entities.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * This interface represents the table in the database where family objects are stored. With creating instances of this
 * interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface FamilyRepository extends JpaRepository<Family,Long> {

}
