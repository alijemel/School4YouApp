package group4.school4you.Repositories;

import group4.school4you.Entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//This is a jpa reporitory that will handle the todos ( termine) with Long id
// we use the repository in the Ressource to talk to the entity
@Repository
public interface TodoJpaRepository extends JpaRepository <Todo, Long>{

    //fetch a todo according to a username
   List<Todo> findByUsername(String username);

}
