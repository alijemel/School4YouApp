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
/**
 * This service provides some helping methods for the family resource.
 */
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

    /**
     * With this method the secretary creates a new family.
     * @param name The name of the new family.
     * @return A message with the name of the created family.
     */
    public ResponseObject createFamily(String name) {
       Family newFamily = familyRepository.save(new Family(name));
       newFamily.setPseudo(name+newFamily.getId());
       return new ResponseObject(newFamily,
               "Neue Familie "+newFamily.getPseudo()+ " gespeichert!");
    }

    /**
     * A method to get all families which are stored in the database.
     * @return A list including all families.
     */
    public List<Family> findAllFamilies() {
        return familyRepository.findAll();
    }

    /**
     * This method deletes a family with an certain id.
     * @param familyId The id to get the family from the repository.
     * @return A message when the desired family was deleted.
     */
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

    /**
     * This method finds all students which are currently not added to a family.
     * @return A list with all available students.
     */
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

    /**
     * This method finds all parents which are currently not added to a family.
     * @return A list with all available parents.
     */
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

    /**
     * This method adds a student to an existing family.
     * @param familyId The id of the family the student is added to.
     * @param studentId The id of the student which is added to the family.
     * @return A message when the student was added successfully to the family.
     */
    public ResponseObject addStudentToFamily(Long familyId, Long studentId) {
        Student toAdd = (Student) studentRepository.findById(studentId).get();
        toAdd.setFamilyId(familyId);
        Family targetFamily = familyRepository.findById(familyId).get();
        targetFamily.addChild(toAdd);
        return new ResponseObject(HttpStatus.OK,
                "Student erfolgreich hinzugefügt!");
    }

    /**
     * This method adds a parent to an existing family.
     * @param familyId The id of the family the parent is added to.
     * @param parentId The id of the parent which is added to the family.
     * @return A message when the parent was added successfully to the family.
     */
    public ResponseObject addParentToFamily(Long familyId, Long parentId) {
        Parent toAdd = (Parent) parentRepository.findById(parentId).get();
        toAdd.setFamilyId(familyId);
        Family targetFamily = familyRepository.findById(familyId).get();
        targetFamily.addParent(toAdd);
        return new ResponseObject(HttpStatus.OK,
                "Eltern erfolgreich hinzugefügt!");
    }

    /**
     * This methods finds all students which are in a certain family.
     * @param familyId The id of the family we want to get the students from.
     * @return A list of all students of the family.
     */
    public List<Student> findStudentsByFamily(Long familyId) {
        Family targetFamily = findById(familyId);
        return targetFamily.getStudents();
    }

    /**
     * This method finds all parents which are in a certain family.
     * @param familyId The id of the family we want to get the parents from.
     * @return A list of all parents of the family.
     */
    public List<Parent> findParentsByFamily(Long familyId) {
        Family targetFamily = findById(familyId);
        return targetFamily.getParents();
    }

    /**
     * A method to remove a student from a family.
     * @param familyId The id of the family we want to remove a student from.
     * @param studentId The id of the student we want to remove from the family.
     * @return A message when the student was successfully removed from the family.
     */
    public ResponseObject removeStudentFromFamily(Long familyId, Long studentId) {
        Family targetFamily = findById(familyId);
        Student toRemove = (Student) studentRepository.findById(studentId).get();
        toRemove.setFamilyId(null);
        targetFamily.removeChild(toRemove);
        return new ResponseObject(HttpStatus.OK,
                "Student wurde entfernt!");
    }

    /**
     * A method to remove a parent from a family.
     * @param familyId The id of the family we want to remove a parent from.
     * @param parentId The if of the parent we want to remove from the family.
     * @return A message when the parent was successfully removed from the family.
     */
    public ResponseObject removeParentFromFamily(Long familyId, Long parentId) {
        Family targetFamily = findById(familyId);
        Parent toRemove = (Parent) parentRepository.findById(parentId).get();
        toRemove.setFamilyId(null);
        targetFamily.removeParent(toRemove);
        return new ResponseObject(HttpStatus.OK,
                "Eltern wurde entfernt!");
    }

    /**
     * This method gets the assigned family of an user.
     * @param userId The id of the user we want to get the family of.
     * @return A message if he has no family yet and otherwise the family object.
     */
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
