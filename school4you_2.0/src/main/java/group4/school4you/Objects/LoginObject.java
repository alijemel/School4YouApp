package group4.school4you.Objects;

public class LoginObject {

    private String email;
    private String password;
    private String message;
    private boolean isValid = false;

    public LoginObject(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
