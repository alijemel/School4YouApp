package group4.school4you.Repositories;

import javax.transaction.Transactional;

@Transactional
/**
 * This interface represents the table in the database where schoolClassInbox objects are stored. With creating
 * instances of this interface the backend is able to communicate with the database tables and manipulate them.
 */
public interface SchoolClassInboxRepository extends SchoolClassRepository{

}
