package group4.school4you.Services;

import group4.school4you.Entities.User;
import group4.school4you.Objects.LoginObject;
import group4.school4you.Repositories.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
/**
 * This service provides some helping methods for the user resource.
 */
public class UserService {

    @Autowired
    private UserJpaRepository userRepository;

    public List<User> findAll() {
        List<User> all = userRepository.findAll();
        return all;
    }

    /**
     * This method finds an user by his id from the database.
     * @param id The id of the user we want to get from the database.
     * @return The user from the database.
     */
    public User findById(long id) {
        return userRepository.findById(id).get();
    }

    /**
     * This method finds an user by his email from the database.
     * @param email The email of the user we want to get from the database.
     * @return The use´r from the database.
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * This method checks if an user already exists in the database.
     * @param id The id of the user we want to check.
     * @return
     */
    public boolean userExists(long id) {
        return (userRepository.findById(id).get() != null);
    }

    /**
     * This method collects the email adresses of all existing users in the system.
     * @return A list of strings with all email adresses.
     */
    public List<String> getExistingEmails() {
        //THROW EXCETION IF NUll
        List<String> existingEmails = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            existingEmails.add(user.getEmail());
        }
        return existingEmails;
    }

    /**
     * This method checks if at the login an email already exists.
     * @param credentials The object we get the email to check from.
     * @return true: if the login mail already exists, false: if it exists not
     */
    public boolean loginEmailExists(LoginObject credentials) {
        if (credentials != null) {
            String email = credentials.getEmail();
            List<String> existingEmails = getExistingEmails();
            if (existingEmails.contains(email)) {
                credentials.setValid(true);
            } else {
                credentials.setValid(false);
                credentials.setMessage("Fehler : Email existiert nicht!");
            }
        }
        return credentials.isValid();
    }

    /**
     * This method checks if the password for a login is valid or not.
     * @param credentials The object we get the password from.
     * @return true: if the password is valid, false: if the password is not valid.
     */
    public boolean isValidLoginCredentials(LoginObject credentials) {
        if (loginEmailExists(credentials)) {
            User storedUser = findByEmail(credentials.getEmail());
            if (storedUser != null) {
                String storedPassword = storedUser.getPassword();
                if (storedPassword.equals(credentials.getPassword())) {
                    credentials.setValid(true);
                } else {
                    credentials.setValid(false);
                    credentials.setMessage("Fehler : Falsches Passwort!");
                }
            }
        }
        return credentials.isValid();
    }

    /**
     * This method checks if the credentials for the login was valid and it was successfull.
     * @param credentials The object to get the login credentials from.
     * @return The user with the email.
     */
    public User authenticate(LoginObject credentials) {
        if (!isValidLoginCredentials(credentials)) {
            return null;
        } else {
            credentials.setMessage("Erfolgreich");
            return userRepository.findByEmail(credentials.getEmail());
        }
    }

    /**
     * This methods edits an users data.
     * @param toEdit The user we want to edit.
     * @param editedUser The user we get the data for the edit from.
     */
    public void changeTo(User toEdit, User editedUser) {
        if (editedUser != null) {
            if(editedUser.getFirstName() != null) {
                toEdit.setFirstName(editedUser.getFirstName());
            }
            if(editedUser.getLastName() != null) {
                toEdit.setLastName(editedUser.getLastName());
            }
            if(editedUser.getEmail() != null) {
                toEdit.setEmail(editedUser.getEmail());
            }
            if(editedUser.getBirthDate() != null) {
                toEdit.setBirthDate(editedUser.getBirthDate());
            }
//            if(editedUser.getPassword() != null) {
//                toEdit.setPassword(editedUser.getPassword());
//            }

        }
    }

    /**
     * This method collects all email adresses from a certain role from the database.
     * @param role The role we want all adresses from.
     * @return A list with all e mail adresses.
     */
    public List<String> getExistingEmailsByRole(String role) {
        List<String> existingEmails = new ArrayList<>();
        List<User> existingUsers = userRepository.findAllByRole(role);
        if(!existingUsers.isEmpty()) {
            for(User user: existingUsers) {
                existingEmails.add(user.getEmail());
            }
        }
                return existingEmails;
    }


}





