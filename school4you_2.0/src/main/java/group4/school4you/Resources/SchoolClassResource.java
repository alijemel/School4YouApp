package group4.school4you.Resources;

import group4.school4you.Entities.*;
import group4.school4you.Services.SchoolClassService;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SchoolClassResource {

    @Autowired
    private SchoolClassService schoolClassService;
    @Autowired
    private UserService userService;


    /**
     * Creates a new school-class with the specified name and saves it in the
     * database.
     *
     * @param name the name of the school-class to be created.
     * @return the created school-class
     */

    @PostMapping(path = "/schoolClass/new/{name}")
    public SchoolClass createClass(@PathVariable String name ) {
        return schoolClassService.create(name);
    }

    /**
     * Adds the user with specified role and email adress to the school-class
     * that has the specified name. Changes are saved in the database.
     *
     * @param targetClassName name of the class where user will be added.
     * @param role role of the user to be added to the class.
     * @param email email of the user to be added to the class.
     * @return the user that has been added to the class.
     */
    @Transactional
    @PutMapping(path = "/schoolClass/{targetClassName}/add/{role}/{email}")
    public User addUserToClass(@PathVariable String targetClassName,
            @PathVariable String role,
                               @PathVariable String email) {
        SchoolClass targetClass =
                schoolClassService.findByName(targetClassName);

        return schoolClassService.addUserByRoleAndEmail(role, email, targetClass);
    }

    /**
     * Removes a user by role and Id from the specified school-class.
     *
     * @param targetClassName name of the school-class.
     * @param role role of the user to be removed from the school-class.
     * @param id Id of the user to be removed from the school-class
     * @return the removed user.
     */
    @Transactional
    @PutMapping (path = "/schoolClass/{targetClassName}/remove/{role}/{id}")
    public User removeUserFromClass(@PathVariable String targetClassName,
                               @PathVariable String role,
                               @PathVariable Long id) {
        SchoolClass targetClass =
                schoolClassService.findByName(targetClassName);
        return schoolClassService.removeUser(role, id, targetClass);

    }

    /**
     * Retrieved the school-classes where the user with the specified Id is
     * enrolled. For a Teacher this can return many school-classes. For
     * students a list with only one school-class will be returned.
     *
     * @param id Id of the user.
     * @return List with the classes where this user is enrolled.
     */
    @Transactional
    @GetMapping (path = "/{id}/myClasses")
    public List<SchoolClass> getClassesByUserId(@PathVariable Long id) {
        User myUser = userService.findById(id);
            if (myUser.getRole().equals("teacher")) {
                Teacher myTeacher = schoolClassService.findTeacherById(id);
                List<SchoolClass> myClasses = myTeacher.getClasses();
                return myClasses;
            }
            else if(myUser.getRole().equals("student")) {
                Student myStudent = schoolClassService.findStudentById(id);
                if (myStudent.getClassId() != null) {
                    List<SchoolClass> myClasses = new ArrayList<>();
                    SchoolClass myActualClass =
                            schoolClassService.findById(myStudent.getClassId());
                    myClasses.add(myActualClass);
                    return myClasses;
                }

            }
            else {
                System.out.println("USER NOT ALLOWED");
            }
            return null;
    }


    /**
     * Retrieves names of all school- classes in the database.
     *
     * @return List with names of existing school- classes.
     */
    @GetMapping (path = "/schoolClass/all")
    public List<String> getAllClassNames() {
        return schoolClassService.getAllClassNames();
    }

    /**
     * Finds and return a school-class by name.
     *
     * @param targetClass name of the school-class to be returned.
     * @return the school-class Entity.
     */
    @GetMapping (path = "/schoolClass/{targetClass}")
    public SchoolClass getClassByName(@PathVariable String targetClass) {
        return schoolClassService.findByName(targetClass);
    }

    /**
     * Finds and returns a school-class by Id.
     *
     * @param id Id of the class to be returned.
     * @return the school-class corresponding to this Id.
     */
    @GetMapping (path = "/myClass/{id}")
    public SchoolClass getClassById(@PathVariable Long id) {
        return schoolClassService.findById(id);
    }

    /**
     * Retrieves emails of students that are not available to be added to a
     * school-class. In other words students that already have a school-class.
     *
     * @return List of unavailable emails of students.
     */
    @GetMapping (path = "/students/unavailable")
    public List<String> getUnavailableStudentEmails () {
        return schoolClassService.getUnavailableStudentEmails();
    }


    /**
     * Creates and saves a class-specific announcement.
     *
     * @param newAnnouncement announcement to be created.
     * @return the created announcement.
     */
    @PostMapping (path = "/classAnnouncements/create")
    public SchoolClassAnnouncement createSchoolClassAnnouncement(
            @RequestBody SchoolClassAnnouncement newAnnouncement) {
        System.out.println(newAnnouncement);

        return schoolClassService.createClassAnnouncement(newAnnouncement);
    }

    /**
     * Retrieves class-specific announcements By Id of the class.
     *
     * @param classId Id of the school-class.
     * @return Announcements corresponding to the school-class.
     */

    @GetMapping (path = "/classAnnouncements/{classId}")
    public List<SchoolClassAnnouncement> getClassAnnouncements (
            @PathVariable Long classId) {
        return schoolClassService.getAllClassAnnouncements(classId);
    }

    /**
     * Edits a class-specific-announcement and saves changes.
     *
     * @param announcementId the announcement to be edited.
     * @param newData new edited fields of the announcement.
     * @return announcement after being edited.
     */
    @PutMapping (path = "/classAnnouncements/edit/{announcementId}")
    public SchoolClassAnnouncement editClassAnnouncement(@PathVariable Long announcementId,
                                                         @RequestBody SchoolClassAnnouncement newData){
        return schoolClassService.editClassAnnouncement(announcementId,
                newData);
    }

    /**
     * Finds a class-specific announcement by Id and deletes it.
     *
     * @param announcementId Id of the announcement to be deleted.
     */
    @DeleteMapping (path = "/classAnnouncements/delete/{announcementId}")
    public void deleteClassAnnouncement(
            @PathVariable Long announcementId) {
        schoolClassService.deleteClassAnnouncement(announcementId);
    }

    /**
     * Returns all Students enrolled in the school-class corresponding to the
     * specified school-class ID.
     *
     * @param classId Id of the school-class.
     * @return all students of that school-class.
     */
    @GetMapping (path = "/class/{classId}/students/all")
    public List<Student> getAllStudentsClass(@PathVariable Long classId) {
        return schoolClassService.findAllStudents(classId);
    }
}
