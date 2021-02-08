package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;


@Entity
@PrimaryKeyJoinColumn(name = "id")
/**
 * With this class it's possible to create admin objects in the system. These got several functions to manipulate the
 * system. The class admin extends the general class user.
 */
public class Admin extends User {

    public Admin(){}
    public Admin (String firstName, String lastName, String email
            ,String password, String role, LocalDate birthDate) {
        super(firstName,lastName,email,password,role,birthDate);
    }

    /**
     * This method allows an admin to approve an user in the database. At registration a user opts his role and after
     * that an admin has to approve the user. After that a user gets all his functions.
     * @param user the user which is to be approved by the admin
     */
    public void setApproved(User user) { user.setApproved(true);}

    public void changeUsersMailAdress(User user, String mailAdress){
        user.setEmail(mailAdress);
    }

    public void changeUsersName(User user, String firstName, String lastName){
        user.setFirstName(firstName);
        user.setLastName(lastName);
    }

}
