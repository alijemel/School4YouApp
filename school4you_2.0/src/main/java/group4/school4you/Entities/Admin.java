package group4.school4you.Entities;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;


@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends User {

    public Admin(){}
    public Admin (String firstName, String lastName, String email
            ,String password, String role, LocalDate birthDate) {
        super(firstName,lastName,email,password,role,birthDate);
    }

    public void setApproved(User user) { user.setApproved(true);}

    public void changeUsersMailAdress(User user, String mailAdress){
        user.setEmail(mailAdress);
    }

    public void changeUsersName(User user, String firstName, String lastName){
        user.setFirstName(firstName);
        user.setLastName(lastName);
    }

}
