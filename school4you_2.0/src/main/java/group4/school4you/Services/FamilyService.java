package group4.school4you.Services;

import group4.school4you.Entities.Family;
import group4.school4you.Entities.Parent;
import group4.school4you.Entities.Student;
import group4.school4you.Entities.User;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Repositories.FamilyRepository;
import group4.school4you.Repositories.ParentRepository;
import group4.school4you.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FamilyService {

    @Autowired
    private FamilyRepository familyRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ParentRepository parentRepository;

    public Family findById(Long familyId){
        return familyRepository.findById(familyId).get();
    }


    public ResponseObject createFamily(String name) {
       Family newFamily = familyRepository.save(new Family(name));
       newFamily.setPseudo(name+newFamily.getId());
       return new ResponseObject(newFamily,
               "Neue Familie "+newFamily.getPseudo()+ " gespeichert!");
    }

    public List<Family> findAllFamilies() {
        return familyRepository.findAll();
    }

    public ResponseObject deleteFamily(Long familyId) {
        Family toDelete = familyRepository.findById(familyId).get();
        for (Student student : toDelete.getStudents()) {
            student.setFamilyId(null);
        }
        for (Parent parent : toDelete.getParents()) {
            parent.setFamilyId(null);
        }
        familyRepository.deleteById(familyId);
        return new ResponseObject(HttpStatus.OK,
                "Familie entfernt! Familienmitglieder sind keiner Familie " +
                        "mehr zugeordnet. Wenn Sie Familienmitglieder aus dem" +
                        " System entfernen möchten müssen Sie es separat " +
                        "machen. ");
    }

    public List<User> findAvailableChildren() {
        List <User> availableStudents = new ArrayList<>();
        List<User> allStudents = studentRepository.findAll();
        for (User student : allStudents) {
            Student st = (Student) student;
            if (st.getFamilyId() == null ) {
                availableStudents.add(st);
            }
        } return availableStudents;

    }

    public List<User> findAvailableParents(){
        List<User> availableParents = new ArrayList<>();
        List<User> allParents = parentRepository.findAll();
        for (User user : allParents ) {
            Parent parent = (Parent) user;
            if (parent.getFamilyId() == null) {
                availableParents.add(parent);
            }
        }
        return availableParents;
    }

    public ResponseObject addStudentToFamily(Long familyId, Long studentId) {
        Student toAdd = (Student) studentRepository.findById(studentId).get();
        toAdd.setFamilyId(familyId);
        Family targetFamily = familyRepository.findById(familyId).get();
        targetFamily.addChild(toAdd);
        return new ResponseObject(HttpStatus.OK,
                "Student erfolgreich hinzugefügt!");
    }

    public ResponseObject addParentToFamily(Long familyId, Long parentId) {
        Parent toAdd = (Parent) parentRepository.findById(parentId).get();
        toAdd.setFamilyId(familyId);
        Family targetFamily = familyRepository.findById(familyId).get();
        targetFamily.addParent(toAdd);
        return new ResponseObject(HttpStatus.OK,
                "Eltern erfolgreich hinzugefügt!");
    }

    public List<Student> findStudentsByFamily(Long familyId) {
        Family targetFamily = findById(familyId);
        return targetFamily.getStudents();
    }

    public List<Parent> findParentsByFamily(Long familyId) {
        Family targetFamily = findById(familyId);
        return targetFamily.getParents();
    }

    public ResponseObject removeStudentFromFamily(Long familyId, Long studentId) {
        Family targetFamily = findById(familyId);
        Student toRemove = (Student) studentRepository.findById(studentId).get();
        toRemove.setFamilyId(null);
        targetFamily.removeChild(toRemove);
        return new ResponseObject(HttpStatus.OK,
                "Student wurde entfernt!");
    }

    public ResponseObject removeParentFromFamily(Long familyId, Long parentId) {
        Family targetFamily = findById(familyId);
        Parent toRemove = (Parent) parentRepository.findById(parentId).get();
        toRemove.setFamilyId(null);
        targetFamily.removeParent(toRemove);
        return new ResponseObject(HttpStatus.OK,
                "Eltern wurde entfernt!");
    }

    public ResponseObject getMyFamily(Long userId) {
        Parent targetUser = (Parent) parentRepository.findById(userId).get();
        if(targetUser.getFamilyId() == null) {
            return new ResponseObject(null,
                    "Ihnen wurde noch keine Familie zugeornet, " +
                            "melden Sie sich bitte beim Sekretariat!");

        }
        else {
            Family targetFamily = findById(targetUser.getFamilyId());
            return new ResponseObject(targetFamily,
                    "");
        }
    }
}
