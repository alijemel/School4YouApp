package group4.school4you.Services;

import group4.school4you.Entities.User;
import group4.school4you.Objects.LoginObject;
import group4.school4you.Repositories.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserJpaRepository userRepository;

    public List<User> findAll() {
        List<User> all = userRepository.findAll();
        return all;
    }

    public User findById(long id) {
        return userRepository.findById(id).get();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public boolean userExists(long id) {
        return (userRepository.findById(id).get() != null);
    }

    public List<String> getExistingEmails() {
        //THROW EXCETION IF NUll
        List<String> existingEmails = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            existingEmails.add(user.getEmail());
        }
        return existingEmails;
    }

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

    public User authenticate(LoginObject credentials) {
        if (!isValidLoginCredentials(credentials)) {
            return null;
        } else {
            credentials.setMessage("Erfolgreich");
            return userRepository.findByEmail(credentials.getEmail());
        }
    }

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





