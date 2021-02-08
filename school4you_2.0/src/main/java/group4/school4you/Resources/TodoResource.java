package group4.school4you.Resources;

import group4.school4you.Entities.Todo;
import group4.school4you.Services.todoHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {

    @Autowired
    private todoHardcodedService todoService;

    @GetMapping(path = "/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username) {
        return todoService.findAll();

    }

    @GetMapping(path = "/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username,
                           @PathVariable long id) {
       return todoService.findById(id);
    }

    //EDIT A TERMIN

    @PutMapping (path = "/users/{username" +
            "}/todos/{id}" )
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username,
                              @PathVariable long id, @RequestBody Todo todo) {
        Todo todoUpdated = todoService.save(todo);
        return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);

    }

    //CREATE A TERMIN FOR A USER
    //WE RETURN VOID AS THE LOCATION OF THE CREATED RESOURCE(by adding{id} to
    // the url
    @PostMapping (path = "/users/{username" +
            "}/todos" )
    public ResponseEntity<Void> addTodo(@PathVariable String username,
                                        @RequestBody Todo todo) {

                Todo createdTodo = todoService.save(todo);
        //we append an id to the currentrequest path

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdTodo.getId()).toUri();

        return ResponseEntity.created(uri).build();

    }







    //We return a response Entity BECAUSE DELETE CAN SUCCESS OR NOT SUCCESS

    @DeleteMapping (path = "/users/{username" +
            "}/todos/{id}" )
    @CrossOrigin(origins = "http://localhost:4200")
    public boolean deleteTodo(@PathVariable String username,
                                             @PathVariable long id) {
        Todo todo = todoService.deleteById(id);
      if(todo !=null) { return true;
     }
     return false;

    }
}

