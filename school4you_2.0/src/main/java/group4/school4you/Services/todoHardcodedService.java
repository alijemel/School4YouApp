package group4.school4you.Services;

import group4.school4you.Entities.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//THIS CLASS WILL BE DELETED!!!!!

@Service
public class todoHardcodedService {

    private static List<Todo> todos = new ArrayList();

    //THIS PLAYS THE ROLE OF THE DAATABASE FOR NOW STATIC INITIALIZER
    private static int idCounter = 0;

    static {

        todos.add(new Todo(++idCounter, "Ali", "Mathe Prüfung",
                new Date(), false));
        todos.add(new Todo(++idCounter, "Andreas", "Kunst Unterricht",
                new Date(), false));
        todos.add(new Todo(++idCounter, "Kevin", "Sport ",
                new Date(), false));
        todos.add(new Todo(++idCounter, "Despina", "Informatik Unterricht",
                new Date(), false));

    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo save(Todo todo) {
        if (todo.getId() == -1 || todo.getId() == 0) {
            todo.setId(++ idCounter);
            todos.add(todo);

        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        //remove uses THE EQUALS METHOD
        todos.remove(todo);
        return todo;
    }

    public Todo findById(long id) {
        for (Todo todo : todos) {
            if (todo.getId() == id) {
                return todo;
            }
        } return null;
    }
}
