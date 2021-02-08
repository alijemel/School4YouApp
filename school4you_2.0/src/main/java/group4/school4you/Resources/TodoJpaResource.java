package group4.school4you.Resources;

import group4.school4you.Entities.Student;
import group4.school4you.Entities.Teacher;
import group4.school4you.Entities.Todo;
import group4.school4you.Entities.User;
import group4.school4you.Repositories.StudentRepository;
import group4.school4you.Repositories.TeacherRepository;
import group4.school4you.Repositories.TodoJpaRepository;
import group4.school4you.Repositories.UserJpaRepository;
import group4.school4you.Services.todoHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoJpaResource {

    @Autowired
    private todoHardcodedService todoService;

    @Autowired
    private TodoJpaRepository todoJpaRepository;

    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;





    @GetMapping(path = "/jpa/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {

        //TEST HAS TO BE DELETED, TEST BEGIN
        User testStudent = new Student("Ali","jemel","alijemel2016@gmail.com"
                ,"alipassword","student",LocalDate.now());
        User testTeacher = new Teacher("Tobias","Tobi","Tobias@gmail" +
                ".com"
                ,"tobiaspassword","teacher",LocalDate.now());
       // User testUser = new User("Admin","admin");
        studentRepository.save(testStudent);
        teacherRepository.save(testTeacher);
        //userJpaRepository.save(testUser);
        //TEST END

        return todoJpaRepository.findByUsername(username);
    }

    @GetMapping(path = "/jpa/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username,
                        @PathVariable long id) {
        //return an Optional object
        return todoJpaRepository.findById(id).get();
    }

    //EDIT A TERMIN

    @PutMapping (path = "/jpa/users/{username" +
            "}/todos/{id}" )
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username,
                                           @PathVariable long id, @RequestBody Todo todo) {
        todo.setUsername(username);
        Todo todoUpdated = todoJpaRepository.save(todo);
        return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);

    }

    //CREATE A TERMIN FOR A USER
    //WE RETURN VOID AS THE LOCATION OF THE CREATED RESOURCE(by adding{id} to
    // the url
    @PostMapping (path = "/jpa/users/{username" +
            "}/todos" )
    public ResponseEntity<Void> createTodo(@PathVariable String username,
                                        @RequestBody Todo todo) {
        //because the front end is not mapping the user to the event
        todo.setUsername(username);

        Todo createdTodo = todoJpaRepository.save(todo);
        //we append an id to the currentrequest path

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdTodo.getId()).toUri();

        return ResponseEntity.created(uri).build();

    }
    //We return a response Entity BECAUSE DELETE CAN SUCCESS OR NOT SUCCESS

    @DeleteMapping (path = "/jpa/users/{username" +
            "}/todos/{id}" )
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean deleteTodo(@PathVariable String username,
                              @PathVariable long id) {
        Optional <Todo> todo = todoJpaRepository.findById(id);
        if(todo.isEmpty()) { return false;
        } else {
            todoJpaRepository.deleteById(id);
            return true;
        }

    }
}

