package group4.school4you;

public class AuthenticationBean {

    private String message;

    public AuthenticationBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("AuthBean [message=%s]",message);
    }
}
