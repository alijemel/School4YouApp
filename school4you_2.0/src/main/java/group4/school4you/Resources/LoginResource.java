package group4.school4you.Resources;

import group4.school4you.Entities.User;
import group4.school4you.Exceptions.LoginException;
import group4.school4you.Objects.LoginObject;
import group4.school4you.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginResource {

    @Autowired
    UserService userService;

    /**
     * Validates a login object containing credentials for user login.
     *
     * @param loginObject credentials of the user who wants to login.
     * @return response entity with the authenticated user and HTTP status.ok
     * if login successfull, throws exception if not.
     */
    @PostMapping(path = "/test" )
    public ResponseEntity<Object> testPostMethod(@RequestBody LoginObject loginObject) {
        LoginObject credentials = loginObject;
        User authenticatedUser = userService.authenticate(credentials);
        if (authenticatedUser == null || !credentials.isValid()) {
            throw new LoginException(credentials.getMessage());
        }
        return new ResponseEntity<>(authenticatedUser ,
                HttpStatus.OK);
    }
}
