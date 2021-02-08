package group4.school4you.Resources;

import group4.school4you.Entities.User;
import group4.school4you.Objects.PasswordDto;
import group4.school4you.Objects.ResponseObject;
import group4.school4you.Repositories.UserJpaRepository;
import group4.school4you.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PasswordController {

    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private EmailService emailService;

    /**
     * Verifies if the email is valid for the password reset process.
     * If the email adress is valid an email with a reset password link will
     * be sent to the email adress and a random reset-token is assigned to the
     * user. When clicked this links redirects to the reset password page of
     * the application.
     *
     * @param email       email to verify.
     * @param environment 'development' if locally in development mode,
     *                    'production' if the app is deployed.
     * @return Response Object containing a boolean value true if email valid
     * and false if not valid. And a message as feedback.
     */
    @GetMapping(path = "/rest-password/verify-email/{email}/{environment}")
    public ResponseObject verifyEmail(@PathVariable String email,
                                      @PathVariable String environment) {
        if (!userJpaRepository.existsByEmail(email)) {
            return new ResponseObject(false, " Email Adresse existiert nicht!");
        } else {
            User user = userJpaRepository.findByEmail(email);
            user.setResetToken(UUID.randomUUID().toString());
            userJpaRepository.save(user);
            String appUrl;

            if (environment.equals("development")) {
                appUrl = "http://localhost:4200/reset-password/enter-password";

            } else {
                appUrl =
                        "http://132.231.36.104:8080/reset-password/enter" +
                                "-password";
            }
            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("alijemel2016@gmail.com");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Password Reset Request");
            passwordResetEmail.setText("Über diesen link können Sie Ihr " +
                    "Passwort ändern:\n" + appUrl
                    + "/" + user.getResetToken());
            emailService.sendEmail(passwordResetEmail);
            return new ResponseObject(true, "Eine Email wurde gesendet!");
        }
    }

    /**
     * Checks if the reset token is valid. It is valid if a user is found
     * that has this token value in his reset-token field.
     *
     * @param token password-reset token.
     * @return true if the token is valid, false if not and a response
     * message as Response object.
     */
    @GetMapping(path = "/reset-password/validate-token/{token}")
    public ResponseObject validateResetToken(@PathVariable String token) {
        if (userJpaRepository.existsByResetToken(token)) {
            return new ResponseObject(true, "Sie können ein neues Passwort " +
                    "setzen!");
        } else {
            return new ResponseObject(false, "Reset Link nicht zulässig! ");
        }
    }

    /**
     * Verifies the password-reset token and and resets user password if the
     * token is valid.
     *
     * @param newPassword new Password.
     * @param token       password-reset token.
     * @return true if the password successfully changes, false if not, and a
     * message as response object.
     */
    @PutMapping(path = "/reset-password/set-new-password/{token}")
    public ResponseObject setNewPassword(@RequestBody PasswordDto newPassword,
                                         @PathVariable String token) {
        Optional<User> user = userJpaRepository.findByResetToken(token);
        if (user.isPresent()) {
            User resetUser = user.get();
            resetUser.setPassword(newPassword.getPassword());
            resetUser.setResetToken(null);
            userJpaRepository.save(resetUser);
            return new ResponseObject(true, "Password erfolgreich geändert!");
        } else {
            return new ResponseObject(false, "Fehler aufgetreten bitte " +
                    "versuchen Sie erneut mit einem neuen Link!");
        }
    }
}
