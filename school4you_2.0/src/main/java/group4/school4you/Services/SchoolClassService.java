package group4.school4you.Services;

import group4.school4you.Entities.*;
import group4.school4you.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
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

    public List<SchoolClass> findAll() {
        List<SchoolClass> all = schoolClassRepository.findAll();
        return all;
    }

    public SchoolClass findById(Long id) {
        return schoolClassRepository.findById(id).get();
    }

    public Teacher findTeacherById (Long id) {
        return (Teacher) teacherRepository.findById(id).get();
    }
    public Student findStudentById (Long id) {
        return (Student) studentRepository.findById(id).get();
    }

    public SchoolClass create(String name) {
        SchoolClass newClass = new SchoolClass(name);
        SchoolClassInbox inbox = new SchoolClassInbox(newClass.getId());
        inboxRepository.save(inbox);
        newClass.setInboxId(inbox.getId());

        return schoolClassRepository.save(newClass);
    }

    public List<SchoolClass> getAllClasses() {
        return schoolClassRepository.findAll();
    }

    public List<String> getAllClassNames() {
        List<SchoolClass> allClasses = getAllClasses();
        List<String> allClassNames = new ArrayList<>();
        for (SchoolClass sc : allClasses) {
            allClassNames.add(sc.getClassName());
        }
        return allClassNames;

    }


    public SchoolClass findByName(String targetClassName) {
        return schoolClassRepository.findByClassName(targetClassName);
    }

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

    public SchoolClassAnnouncement createClassAnnouncement(
            SchoolClassAnnouncement newAnnouncement) {
        System.out.println(newAnnouncement);
        return schoolClassAnnouncementRepository.save(newAnnouncement);
    }

    public List<SchoolClassAnnouncement> getAllClassAnnouncements (Long classId) {
        System.out.println(classId);
        return schoolClassAnnouncementRepository.findAllByClassId(classId);

    }

    public SchoolClassAnnouncement editClassAnnouncement(Long announcementId,
                                                         SchoolClassAnnouncement newData) {
        SchoolClassAnnouncement oldData =
                schoolClassAnnouncementRepository.findById(announcementId).get();
        oldData.setSubject(newData.getSubject());
        oldData.setContent(newData.getContent());
        return schoolClassAnnouncementRepository.save(oldData);
    }

    public void deleteClassAnnouncement(Long announcementId) {
        schoolClassAnnouncementRepository.deleteById(announcementId);
    }

    public List<Student> findAllStudents(Long classId) {
        return findById(classId).getStudents();
    }
}
