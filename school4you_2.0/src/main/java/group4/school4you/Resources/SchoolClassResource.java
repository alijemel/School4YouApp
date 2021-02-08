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

    @PostMapping(path = "/schoolClass/new/{name}")
    public SchoolClass createClass(@PathVariable String name ) {
        //HIER THROW PARSING EXCEPTION
        return schoolClassService.create(name);
    }

    @Transactional
    @PutMapping(path = "/schoolClass/{targetClassName}/add/{role}/{email}")
    public User addUserToClass(@PathVariable String targetClassName,
            @PathVariable String role,
                               @PathVariable String email) {
        //HIER THROW PARSING EXCEPTIONs
        SchoolClass targetClass =
                schoolClassService.findByName(targetClassName);

        return schoolClassService.addUserByRoleAndEmail(role, email, targetClass);

    }

    @Transactional
    @PutMapping (path = "/schoolClass/{targetClassName}/remove/{role}/{id}")
    public User removeUserFromClass(@PathVariable String targetClassName,
                               @PathVariable String role,
                               @PathVariable Long id) {
        SchoolClass targetClass =
                schoolClassService.findByName(targetClassName);
        return schoolClassService.removeUser(role, id, targetClass);

    }

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
                System.out.println("HIER EXCEPTION USER NOT ALLOWED");
            }
            return null;

    }


    @GetMapping (path = "/schoolClass/all")
    public List<String> getAllClassNames() {
        return schoolClassService.getAllClassNames();
    }
    @GetMapping (path = "/schoolClass/{targetClass}")
    public SchoolClass getClassByName(@PathVariable String targetClass) {
        return schoolClassService.findByName(targetClass);
    }

    @GetMapping (path = "/myClass/{id}")
    public SchoolClass getClassById(@PathVariable Long id) {
        return schoolClassService.findById(id);
    }

    @GetMapping (path = "/students/unavailable")
    public List<String> getUnavailableStudentEmails () {
        return schoolClassService.getUnavailableStudentEmails();
    }

    @PostMapping (path = "/classAnnouncements/create")
    public SchoolClassAnnouncement createSchoolClassAnnouncement(
            //@PathVariable Long classId,
            @RequestBody SchoolClassAnnouncement newAnnouncement) {
        System.out.println(newAnnouncement);

        return schoolClassService.createClassAnnouncement(newAnnouncement);
    }

    @GetMapping (path = "/classAnnouncements/{classId}")
    public List<SchoolClassAnnouncement> getClassAnnouncements (
            @PathVariable Long classId) {
        return schoolClassService.getAllClassAnnouncements(classId);
    }

    @PutMapping (path = "/classAnnouncements/edit/{announcementId}")
    public SchoolClassAnnouncement editClassAnnouncement(@PathVariable Long announcementId,
                                                         @RequestBody SchoolClassAnnouncement newData){
        return schoolClassService.editClassAnnouncement(announcementId,
                newData);
    }

    @DeleteMapping (path = "/classAnnouncements/delete/{announcementId}")
    public void deleteClassAnnouncement(
            @PathVariable Long announcementId) {
        schoolClassService.deleteClassAnnouncement(announcementId);

    }

    @GetMapping (path = "/class/{classId}/students/all")
    public List<Student> getAllStudentsClass(@PathVariable Long classId) {
        return schoolClassService.findAllStudents(classId);
    }










}
