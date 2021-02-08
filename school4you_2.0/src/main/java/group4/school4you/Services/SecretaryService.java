package group4.school4you.Services;


import group4.school4you.Entities.User;
import group4.school4you.Entities.SchoolClass;
import group4.school4you.Repositories.*;

import java.util.List;


public class SecretaryService {

    private StudentRepository studentRepository;
    private ParentRepository parentRepository;
    private SchoolClassRepository schoolClassRepository;

    /**
     * This method is for the frontend to find all unapproved users with the roles parents&students.
     * Once you got them, they can be shown in the frontend.
     * @return a list of all unapproved students and parents.
     */
    public List<User> getAllUnapproved(){

        //list of all unapproved parents and students
        List<User> unapproved = null;
        //get all unapproved parents from the help method "getUnapprovedParents"
        List<User> unapprovedParents = getUnapprovedParents();
        //get all unapproved students from the help method "getUnapprovedStudents"
        List<User> unapprovedStudents = getUnapprovedStudents();

        //merge all unapproved parents&students into the list "unapproved"
        for(int i = 0; i < unapprovedParents.size(); i++){
            unapproved.add(unapprovedParents.get(i));
        }
        for(int i = 0; i < unapprovedStudents.size(); i++){
            unapproved.add(unapprovedStudents.get(i));
        }
        return unapproved;
    }

    /**
     * This method finds all unapproved students from the database.
     * @return a list of all unapproved students.
     */
    public List<User> getUnapprovedStudents(){
        List<User> students = studentRepository.findAll();
        List<User> unapprovedStudents = null;

        for(int i = 0; i < students.size(); i++){
            if(!students.get(i).getApproved()){
                unapprovedStudents.add(students.get(i));
            }
        }
        return unapprovedStudents;
    }

    /**
     * This method finds all unapproved parents from the database.
     * @return a list of all unapproved parents.
     */
    public List<User> getUnapprovedParents(){
        List<User> parents = parentRepository.findAll();
        List<User> unapprovedParents = null;

        for (int i = 0; i < parents.size(); i++){
            if(!parents.get(i).getApproved()){
                unapprovedParents.add(parents.get(i));
            }
        }
        return unapprovedParents;
    }


    /**
     * This method helps to find a class in the database by it's name. If there is no
     * class in the database with the name, it returns null.
     * @param name The name of the class which is searched for.
     * @return Return the class with the searched name or null if there is no class with this name.
     */
    public SchoolClass findByName(String name){

        List<SchoolClass> allClasses = schoolClassRepository.findAll();
        for(int i = 0; i < allClasses.size(); i++){
            if(allClasses.get(i).getClassName().equals(name)){
                return allClasses.get(i);
            }
        }
        return null;
    }
}
