package group4.school4you.Exceptions;

public class LoginException extends RuntimeException{

    public LoginException(String error) {
        super(error);
    }
}
