package group4.school4you.Resources;

import group4.school4you.Entities.Student;
import group4.school4you.Entities.Teacher;
import group4.school4you.Repositories.StudentRepository;
import group4.school4you.Repositories.TeacherRepository;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TeacherResource {
    @Autowired
    private TeacherRepository teacherRepository;

    private UserService userService;


}
