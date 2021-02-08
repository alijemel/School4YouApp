package group4.school4you.Resources;

import group4.school4you.Entities.*;
import group4.school4you.Repositories.*;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserResource {

    @Autowired
    private UserService userService;
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private SecretaryRepository secretaryRepository;
    @Autowired
    private ParentRepository parentRepository;


    /**
     * returns users of the role specified in the path.
     *
     * @param role the role of the users to be returned.
     * @return List of users of that role or null if role not specified.
     */
    @GetMapping(path = "/{role}/all")
    public List<User> getAllByRole(@PathVariable String role) {
        if (role.equals("student")) {
            List<User> allStudents = studentRepository.findAll();
            return allStudents;
        } else if (role.equals("teacher")) {
            List<User> allTeachers = teacherRepository.findAll();
            return allTeachers;
        } else if (role.equals("secretary")) {
            List<User> allSecretary = secretaryRepository.findAll();
            return allSecretary;
        } else if (role.equals("admin")) {
            List<User> allAdmin = adminRepository.findAll();
            return allAdmin;
        } else if (role.equals("parent")) {
            List<User> allParents = parentRepository.findAll();
            return allParents;
        }
        return null;
    }

    /**
     * return all users stored ion the database.
     *
     * @return all users.
     */
    @GetMapping(path = "/users/all")
    public List<User> getAllUsers() {
        return userJpaRepository.findAll();
    }


    /**
     * returns all existing email Adresses. This is for example used in the
     * frontend for the login to display errors.
     *
     * @return List of all existing email adresses.
     */
    @GetMapping(path = "/users/existingEmails")
    public List<String> getAllExistingEmails() {
        return userService.getExistingEmails();
    }

    /**
     * retrieves existing email Adresses for users of a specific role.
     *
     * @param role the specified role.
     * @return list of existing emails corresponding to the specified role.
     */
    @GetMapping(path = "/{role}/existingEmails")
    public List<String> getExistingEmailsByRole(@PathVariable String role) {
        return userService.getExistingEmailsByRole(role);
    }


    /**
     * Creates a new user of a specified role and saves it in the database.
     *
     * @param role the role of the new user to be created.
     * @param user Requestbody that specifies the attributes of the user to
     *             be created.
     * @return the created user or null if role not valid.
     */
    @PostMapping(path = "/{role}/neu")
    public User createUser(@PathVariable String role, @RequestBody User user) {

        if (role.equals("student")) {
            Student neuStudent = new Student(user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getPassword(),
                    user.getRole(), user.getBirthDate());
            return studentRepository.save(neuStudent);
        } else if (role.equals("teacher")) {
            Teacher neuTeacher = new Teacher(user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getPassword(),
                    user.getRole(), user.getBirthDate());
            return teacherRepository.save(neuTeacher);
        } else if (role.equals("secretary")) {
            Secretary neuSecretary = new Secretary(user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getPassword(),
                    user.getRole(), user.getBirthDate());
            return secretaryRepository.save(neuSecretary);
        } else if (role.equals("admin")) {
            Admin neuAdmin = new Admin(user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getPassword(),
                    user.getRole(), user.getBirthDate());
            return adminRepository.save(neuAdmin);
        } else if (role.equals("parent")) {
            Parent neuParent = new Parent(user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getPassword(),
                    user.getRole(), user.getBirthDate());
            return parentRepository.save(neuParent);

        }
        return null;
    }

    /**
     * Finds a user corresponding to the id and edits it.
     * Changes are stored in the database.
     *
     * @param id         Id of the user to be edited.
     * @param editedUser Object containing the edited fields.
     */
    @PutMapping(path = "/editUser/{id}")
    public void editUser(@PathVariable long id,
                         @RequestBody User editedUser) {
        User toEdit = userService.findById(id);
        userService.changeTo(toEdit, editedUser);
        userJpaRepository.save(toEdit);
    }
}
