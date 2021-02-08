package group4.school4you.Resources;

import group4.school4you.Entities.Family;
import group4.school4you.Entities.Parent;
import group4.school4you.Entities.Student;
import group4.school4you.Entities.User;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Services.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FamilyResource {

    @Autowired
    FamilyService familyService;

    /**
     * Gets all families from the database.
     *
     * @return List of all families.
     */
    @GetMapping(path = "/families/all")
    public List<Family> getAllFamilies() {
        return familyService.findAllFamilies();
    }

    /**
     * Creates ans saves a new family.
     *
     * @param name name of the family to be created.
     * @return Response Object with the new created family and a message.
     */
    @Transactional
    @PostMapping(path = "/family/create/{name}")
    public ResponseObject createFamily(@PathVariable String name) {
        return familyService.createFamily(name);
    }

    /**
     * Deletes a family by Id.
     *
     * @param familyId Id of the family to be deleted.
     * @return Response object with the deletes family and a message.
     */
    @Transactional
    @DeleteMapping(path = "/family/delete/{familyId}")
    public ResponseObject deleteFamily(@PathVariable Long familyId) {
        return familyService.deleteFamily(familyId);
    }

    /**
     * Gets students that are not assigned to a family.
     *
     * @return List of students not assigned to a family.
     */
    @GetMapping(path = ("/available/children"))
    public List<User> getAvailableChildren() {
        return familyService.findAvailableChildren();
    }

    /**
     * Gets parents that are not assigned to a family.
     *
     * @return List of parents not assigned to a family.
     */
    @GetMapping(path = ("/available/parents"))
    public List<User> getAvailableParents() {
        return familyService.findAvailableParents();
    }

    /**
     * Assigns student to a family.
     *
     * @param familyId  Id of the family.
     * @param studentId Id of the student.
     * @return Response Object and a message.
     */
    @Transactional
    @PostMapping(path = "/family/{familyId}/add/student/{studentId}")
    public ResponseObject addStudentToFamily(@PathVariable Long familyId,
                                             @PathVariable Long studentId) {
        return familyService.addStudentToFamily(familyId, studentId);
    }

    /**
     * Assigns a parent to a family.
     *
     * @param familyId Id of the family.
     * @param parentId Id of the parentt.
     * @return Response Object and a message.
     */
    @Transactional
    @PostMapping(path = "/family/{familyId}/add/parent/{parentId}")
    public ResponseObject addParentToFamily(@PathVariable Long familyId,
                                            @PathVariable Long parentId) {
        return familyService.addParentToFamily(familyId, parentId);
    }

    /**
     * Gets all students assigned to a specific family.
     *
     * @param familyId Id of the family.
     * @return List of all students of that family.
     */
    @Transactional
    @GetMapping(path = "/family/{familyId}/students")
    public List<Student> getStudentsByFamily(@PathVariable Long familyId) {
        return familyService.findStudentsByFamily(familyId);
    }

    /**
     * Gets parents assigned to a specific family.
     *
     * @param familyId Id of the family.
     * @return List of all parents of that family.
     */
    @Transactional
    @GetMapping(path = "/family/{familyId}/parents")
    public List<Parent> getParentsById(@PathVariable Long familyId) {
        return familyService.findParentsByFamily(familyId);
    }

    /**
     * Removes student from a family.
     *
     * @param familyId  Id of the family to remove from.
     * @param studentId Id of the student to remove.
     * @return Response Object with removed student and a message.
     */
    @Transactional
    @DeleteMapping(path = "/family/{familyId}/remove/student/{studentId}")
    public ResponseObject deleteStudentFromFamily(@PathVariable Long familyId,
                                                  @PathVariable Long studentId) {
        return familyService.removeStudentFromFamily(familyId, studentId);
    }

    /**
     * Removes a parent from a family.
     *
     * @param familyId Id of the family to remove from.
     * @param parentId Id of the parent to remove.
     * @return Response Object with removed parent and a message.
     */
    @Transactional
    @DeleteMapping(path = "/family/{familyId}/remove/parent/{parentId}")
    public ResponseObject deleteParentFromFamily(@PathVariable Long familyId,
                                                 @PathVariable Long parentId) {
        return familyService.removeParentFromFamily(familyId, parentId);
    }

    //For Parents Meine_Familie

    /**
     * Gets the family of a user by user Id.
     *
     * @param userId Id of the user.
     * @return family of this user.
     */
    @GetMapping(path = "/MyFamily/{userId}")
    public ResponseObject getMyFamily(@PathVariable Long userId) {
        return familyService.getMyFamily(userId);
    }

}
