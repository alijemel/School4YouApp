package group4.school4you.Services;

import group4.school4you.Entities.*;
import group4.school4you.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
/**
 * This service provides some helping methods for the schoolClass resource.
 */
public class SchoolClassService {

    @Autowired
    private SchoolClassRepository schoolClassRepository;
    @Autowired
    private InboxRepository inboxRepository;
    @Autowired
    private SchoolClassAnnouncementRepository schoolClassAnnouncementRepository;


    @Autowired
    StudentRepository studentRepository;
    @Autowired
    TeacherRepository teacherRepository;

    /**
     * This method gets all schoolClasses.
     * @return A list with all schoolClasses in the database.
     */
    public List<SchoolClass> findAll() {
        List<SchoolClass> all = schoolClassRepository.findAll();
        return all;
    }

    /**
     * To get a certain schoolClass by its id.
     * @param id The id of the schoolClass we want to get.
     * @return The belonging schoolClass from the database.
     */
    public SchoolClass findById(Long id) {
        return schoolClassRepository.findById(id).get();
    }

    /**
     * To get a certain teacher by its id.
     * @param id The id of the teacher we want to get.
     * @return The belonging teacher from the database.
     */
    public Teacher findTeacherById (Long id) {
        return (Teacher) teacherRepository.findById(id).get();
    }

    /**
     * To get a certain student by its id.
     * @param id The id of the student we want to get.
     * @return The belonging student from the database.
     */
    public Student findStudentById (Long id) {
        return (Student) studentRepository.findById(id).get();
    }

    /**
     * This method creates a new schoolClass in the database.
     * @param name The name of the new schoolClass.
     * @return The repository of schoolClasses including the new one.
     */
    public SchoolClass create(String name) {
        SchoolClass newClass = new SchoolClass(name);
        SchoolClassInbox inbox = new SchoolClassInbox(newClass.getId());
        inboxRepository.save(inbox);
        newClass.setInboxId(inbox.getId());

        return schoolClassRepository.save(newClass);
    }

    /**
     * A method that gets all schoolClasses from the database.
     * @return A list with all classes.
     */
    public List<SchoolClass> getAllClasses() {
        return schoolClassRepository.findAll();
    }

    /**
     * This method collects all names of the existing schoolClasses in the database.
     * @return A list of strings including all names of the schoolClasses.
     */
    public List<String> getAllClassNames() {
        List<SchoolClass> allClasses = getAllClasses();
        List<String> allClassNames = new ArrayList<>();
        for (SchoolClass sc : allClasses) {
            allClassNames.add(sc.getClassName());
        }
        return allClassNames;

    }

    /**
     * This method finds a certain schoolClass in the database by using its name.
     * @param targetClassName The name of the schoolClass we are searching for.
     * @return The schoolClass found in the database.
     */
    public SchoolClass findByName(String targetClassName) {
        return schoolClassRepository.findByClassName(targetClassName);
    }

    /**
     * This method adds a user to a certain schoolClass. It distinguishes if the user is a teacher or a student
     * and then adds the user to the schoolClass.
     * @param role The role of the user to get the right repository.
     * @param email To get the right user from the database.
     * @param targetClass The class we want to add the user to.
     * @return The added user.
     */
    public User addUserByRoleAndEmail(String role, String email, SchoolClass targetClass) {
        if (role.equals("student")) {
            Student addedStudent = (Student) studentRepository.findByEmail(email);
            if (!targetClass.getStudents().contains(addedStudent)) {
                targetClass.addStudent(addedStudent);
                schoolClassRepository.save(targetClass);
                return addedStudent;
            } else {
                //THROW EXCEPTION
            }


        } else if (role.equals("teacher")) {
            Teacher addedTeacher =
                    (Teacher)teacherRepository.findByEmail(email);
            if (!targetClass.getTeachers().contains(addedTeacher)) {
                targetClass.addTeacher(addedTeacher);
                schoolClassRepository.save(targetClass);
                return addedTeacher;
            } else {
                //throw Exception
            }
        }
        return null;
    }

    /**
     * This method removes an user from a schoolClass. It distinguishes if the user is a teacher or a student and then
     * removes the user from the schoolClass.
     * @param role The role which says if the user is a teacher or a student.
     * @param id The id of the user to find him in the database.
     * @param targetClass The target schoolClass where we want the user to remove from.
     * @return The removed user.
     */
    public User removeUser(String role, Long id, SchoolClass targetClass) {
        if (role.equals("student")) {
            User toRemove = studentRepository.findById(id).get();
            targetClass.removeStudent((Student) toRemove);
            schoolClassRepository.save(targetClass);
            return toRemove;
        } else if (role.equals("teacher")) {
            User toRemove =teacherRepository.findById(id).get();
            targetClass.removeTeacher((Teacher) toRemove);
            schoolClassRepository.save(targetClass);
            return toRemove;
        }
        return null;

    }

    /**
     * This method collects all unavailable email adresses from unavailable students.
     * @return A list of strings with all emails.
     */
    public List<String> getUnavailableStudentEmails () {
        List<String> unavailableEmails = new ArrayList<>();
        List<SchoolClass> allClasses = getAllClasses();
        for(SchoolClass schoolClass : allClasses) {
            for( User student : schoolClass.getStudents()) {
                unavailableEmails.add(student.getEmail());
            }
        }
        return unavailableEmails;
    }

    /**
     * This method creates a new classAnnouncement for a schoolClass.
     * @param newAnnouncement The announcement which is created.
     * @return The created schoolClassAnnouncement.
     */
    public SchoolClassAnnouncement createClassAnnouncement(
            SchoolClassAnnouncement newAnnouncement) {
        System.out.println(newAnnouncement);
        return schoolClassAnnouncementRepository.save(newAnnouncement);
    }

    /**
     * This method collects all announcements for a certain schoolClass.
     * @param classId The id of the schoolClass we want the announcements from.
     * @return A list of all announcements of the schoolClass.
     */
    public List<SchoolClassAnnouncement> getAllClassAnnouncements (Long classId) {
        System.out.println(classId);
        return schoolClassAnnouncementRepository.findAllByClassId(classId);

    }

    /**
     * This method allows us to edit a announcement with a certain id and give it new content.
     * @param announcementId The id of the announcement we want to edit.
     * @param newData The new content for the announcement.
     * @return The edited announcement.
     */
    public SchoolClassAnnouncement editClassAnnouncement(Long announcementId,
                                                         SchoolClassAnnouncement newData) {
        SchoolClassAnnouncement oldData =
                schoolClassAnnouncementRepository.findById(announcementId).get();
        oldData.setSubject(newData.getSubject());
        oldData.setContent(newData.getContent());
        return schoolClassAnnouncementRepository.save(oldData);
    }

    /**
     * This method deletes an announcement from the database.
     * @param announcementId The id of the announcement we want to remove.
     */
    public void deleteClassAnnouncement(Long announcementId) {
        schoolClassAnnouncementRepository.deleteById(announcementId);
    }

    /**
     * This method gets a list of all students in a certain schoolClass.
     * @param classId The id of the class we want the students of.
     * @return A list of all students of the class.
     */
    public List<Student> findAllStudents(Long classId) {
        return findById(classId).getStudents();
    }
}
