package group4.school4you.Resources;

import group4.school4you.Entities.Admin;
import group4.school4you.Entities.User;
import group4.school4you.Repositories.AdminRepository;
import group4.school4you.Repositories.UserJpaRepository;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminResource {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private UserJpaRepository userRepository;
    private Admin admin;


    /**
     * This method allows an admin to approve an user in the database.
     * @param id The id to get the belonging user from the database.
     */
    @PutMapping(path = "/admin/approve/{id}")
    public void approveUser(@PathVariable long id){
                User toEdit = userService.findById(id);
                toEdit.setApproved(true);
                userRepository.save(toEdit);
    }
    /**
     * This method allows an admin to approve an user in the database.
     * @param id The id to get the belonging user from the database.
     */
    @PutMapping(path = "/admin/disApprove/{id}")
    public void disApproveUser(@PathVariable long id){
        User toEdit = userService.findById(id);
        toEdit.setApproved(false);
        userRepository.save(toEdit);
    }


    /**
     * This method allows an admin to change the users mail adress.
     * @param id The id to identify the belonging user from the database.
     * @param mailAdress The new mail adress the user gets.
     */
    @PutMapping(path = "/admin/editUser/{id}/{mailAdress}")
    public void editUsersMail(@PathVariable long id, @PathVariable String mailAdress){
            User toEdit = userService.findById(id);
            admin.changeUsersMailAdress(toEdit, mailAdress);
            userRepository.save(toEdit);
    }

    /**
     * This method allows an admin to change the users name.
     * @param id The id to identify the belonging user from the database
     * @param firstName The new first name of the user.
     * @param lastName The new last name of the user.
     */
    @PutMapping(path = "/admin/editUser/{id}/{firstName}/{lastName}")
    public void editUsersName(@PathVariable long id, @PathVariable String firstName, @PathVariable String lastName){
            User toEdit = userService.findById(id);
            admin.changeUsersName(toEdit, firstName, lastName);
            userRepository.save(toEdit);
    }

    /**
     * This method allows an admin to delete an user.
     * @param id The id to get the user which is deleted.
     */
    @DeleteMapping (path = "/admin/deleteUser/{id}" )
    @CrossOrigin(origins = "http://localhost:4200")
    public void deleteUser(@PathVariable long id) {
       userRepository.deleteById(id);
    }



}
