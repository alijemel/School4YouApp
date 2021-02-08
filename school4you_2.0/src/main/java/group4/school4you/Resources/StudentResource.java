package group4.school4you.Resources;

import group4.school4you.Entities.Student;
import group4.school4you.Entities.User;
import group4.school4you.Repositories.StudentRepository;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StudentResource {

    @Autowired
    private StudentRepository studentRepository;

    private UserService userService;




}
