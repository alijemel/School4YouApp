package group4.school4you.Services;

import group4.school4you.Entities.*;
import group4.school4you.Objects.Role;
import group4.school4you.Repositories.SchoolClassRepository;
import group4.school4you.Repositories.SickNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SickNoteService {

    @Autowired
    private SickNoteRepository sickNoteRepository;
    @Autowired
    private SchoolClassRepository schoolClassRepository;



    public List<SickNote> getAllSickNotesByClassAndRole(String roleAsString,
                                                        Long classId) {
        List<SickNote> sickNotes = new ArrayList<>();
        SchoolClass targetClass = schoolClassRepository.findById(classId).get();
        Role targetRole = Role.valueOf(roleAsString);
        if (targetRole == Role.TEACHER) {
           List<Student> usersInClass = targetClass.getStudents();
           for (Student loopStudent : usersInClass) {
               List<SickNote> loopSickNotes = sickNoteRepository
                       .findAllByUserIdAndStartDateAfterAndApproved(loopStudent.getId(),
                               LocalDate.now(),true);
               sickNotes.addAll(loopSickNotes);
           }
        } else {
            List<Teacher> usersInClass = targetClass.getTeachers();
            for (Teacher loopTeacher : usersInClass) {
                List<SickNote> loopSickNotes = sickNoteRepository
                        .findAllByUserIdAndStartDateAfterAndApproved(loopTeacher.getId(),
                                LocalDate.now(), true);
                sickNotes.addAll(loopSickNotes);
            }
        }
        return sickNotes;
    }
}
