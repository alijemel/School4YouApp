package group4.school4you.Objects;

// Objeckt representation von einem passwort damit wir es nicht in url paths
// senden sondern als objekt es ist sicherer.

import java.util.Objects;
public class PasswordDto {

    private String password;

    public PasswordDto(){}

    public PasswordDto(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PasswordDto that = (PasswordDto) o;
        return password.equals(that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(password);
    }
}
