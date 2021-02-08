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

    @GetMapping (path = "/families/all")
    public List<Family> getAllFamilies(){
        return familyService.findAllFamilies();
    }

    @Transactional
    @PostMapping(path = "/family/create/{name}")
    public ResponseObject createFamily(@PathVariable String name){
        return familyService.createFamily(name);
    }

    @Transactional
    @DeleteMapping (path = "/family/delete/{familyId}")
    public ResponseObject deleteFamily(@PathVariable Long familyId) {
        return familyService.deleteFamily(familyId);
    }

    @GetMapping (path = ("/available/children"))
    public List<User> getAvailableChildren() {
        return familyService.findAvailableChildren();
    }

    @GetMapping (path = ("/available/parents"))
    public List<User> getAvailableParents() {
        return familyService.findAvailableParents();
    }

    @Transactional
    @PostMapping (path = "/family/{familyId}/add/student/{studentId}")
    public ResponseObject addStudentToFamily(@PathVariable Long familyId,
                                             @PathVariable Long studentId){
        return familyService.addStudentToFamily(familyId, studentId);
    }

    @Transactional
    @PostMapping (path = "/family/{familyId}/add/parent/{parentId}")
    public ResponseObject addParentToFamily(@PathVariable Long familyId,
                                             @PathVariable Long parentId){
        return familyService.addParentToFamily(familyId, parentId);
    }

    @Transactional
    @GetMapping (path = "/family/{familyId}/students")
    public List<Student> getStudentsByFamily(@PathVariable Long familyId) {
        return familyService.findStudentsByFamily(familyId);
    }

    @Transactional
    @GetMapping (path = "/family/{familyId}/parents")
    public List<Parent> getParentsById(@PathVariable Long familyId) {
        return familyService.findParentsByFamily(familyId);
    }

    @Transactional
    @DeleteMapping (path = "/family/{familyId}/remove/student/{studentId}")
    public ResponseObject deleteStudentFromFamily(@PathVariable Long familyId,
                                                  @PathVariable Long studentId){
        return familyService.removeStudentFromFamily(familyId,studentId);
    }

    @Transactional
    @DeleteMapping (path = "/family/{familyId}/remove/parent/{parentId}")
    public ResponseObject deleteParentFromFamily(@PathVariable Long familyId,
                                                  @PathVariable Long parentId){
        return familyService.removeParentFromFamily(familyId,parentId);
    }


    //For Parents Meine_Familie

    @GetMapping (path = "/MyFamily/{userId}")
    public ResponseObject getMyFamily(@PathVariable Long userId){
        return familyService.getMyFamily(userId);

    }

}
