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

    @GetMapping(path = "/test")
    public ResponseEntity<String> testMethod() throws RuntimeException {
        if (true) {throw new RuntimeException("error message from ali");}

        return new ResponseEntity<String>("Response entity of test method",
                HttpStatus.OK);
    }

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
